import datetime
import json
from django.db.models import Max
from django.core.exceptions import ValidationError

from crypto.utils.abis import NFT_ABI, OPENSEA_ABI, PAY_MINT_ABI
from crypto.models import NftAnalytics, Nft
from django.conf import settings

# from eth_account._utils.transactions import Transaction
from web3 import Web3

# w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/d985a99e4a90422cb73ceb3e1dab31ef"))
# w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/3060a4377c5e489f9f950d045ff82d13"))
# w3 = Web3(Web3.HTTPProvider("https://kovan.infura.io/v3/59a36e39ab36434b8473aa313ef7db7b"))

w3 = Web3(Web3.HTTPProvider(settings.ETH_RPC_URL))
###################
#
#### Load up the contract
#
#####################

OPENSEA_CONTRACT_ADDRESS = "0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b"
# use block from sep 19 2021
# STARTBLOCK = 27249219

OPENSEA_ABI = json.loads(OPENSEA_ABI)
NFT_ABI = json.loads(NFT_ABI)
PAYMINT = json.loads(PAY_MINT_ABI)

OPENSEA_CONTRACT = w3.eth.contract(
    address=w3.toChecksumAddress(OPENSEA_CONTRACT_ADDRESS), abi=OPENSEA_ABI
)
NFT_CONTRACT = w3.eth.contract(
    address=w3.toChecksumAddress(settings.CONTRACT_ADDRESS_1155), abi=NFT_ABI
)
PAYMENT_CONTRACT = w3.eth.contract(
    address=w3.toChecksumAddress(settings.CONTRACT_ADDRESS_PAY_MINT), abi=PAYMINT
)


CURRENCIES = {
    "0x6b175474e89094c44da98b954eedeac495271d0f": "DAI",
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": "USDC",
}


###################
#
#### Get Transaction Events
#
#####################


def get_block_time(blocknum):
    try:
        block = w3.eth.get_block(blocknum)
        ts = str(datetime.datetime.fromtimestamp(block["timestamp"]))
    except Exception as e:
        print(e)
    return ts


def decode_event(contract, abi, log_event, reciept, address):
    ### get all abi events
    abi_events = [a for a in abi if a["type"] == "event"]
    all_sigs = []
    for event in abi_events:
        # Get event signature components
        name = event["name"]
        inputs = [param["type"] for param in event["inputs"]]
        inputs = ",".join(inputs)
        # Hash event signature
        event_signature_text = f"{name}({inputs})"
        event_signature_hex = w3.toHex(w3.keccak(text=event_signature_text))
        all_sigs.append(event_signature_hex)
    # Find match between log's event signature and ABI's event signature
    if log_event in all_sigs:
        index = all_sigs.index(log_event)
        # Decode matching log
        decoded_logs = contract.events[abi_events[index]["name"]]().processReceipt(
            reciept
        )
        if len(decoded_logs) > 0:
            decoded_logs = [
                d
                for d in decoded_logs
                if d["address"].lower()
                in [
                    OPENSEA_CONTRACT_ADDRESS.lower(),
                    settings.CONTRACT_ADDRESS_1155.lower(),
                ]
            ]
            return decoded_logs
        else:
            return None
    else:
        return None


def extract_transaction_values(transaction_hash):
    transaction = w3.eth.get_transaction(transaction_hash)
    receipt = w3.eth.getTransactionReceipt(transaction_hash)
    logs = receipt.logs
    # get log addresses to see if there is a different currency in there
    log_addresses = [
        log["address"].lower() for log in logs if log["address"].lower() in CURRENCIES
    ]
    ### get all topics
    receipt_event_signature_hexs = list(
        set(
            [
                (w3.toHex(log["topics"][0]), log["address"].lower())
                for log in logs
                if log["address"].lower()
                in [OPENSEA_CONTRACT_ADDRESS.lower(), NFT_ADDRESS.lower()]
            ]
        )
    )
    # pull out all evetns from the logs
    card_index = []
    quantity = []
    the_time = None
    price = None
    block = None
    sender = None
    reciever = None
    currency = "ETH" if len(log_addresses) == 0 else CURRENCIES[log_addresses[0]]
    all_transfer_events = []
    all_transfer_events_withprice = []
    for sighex in receipt_event_signature_hexs:
        address = sighex[1]
        contract = (
            OPENSEA_CONTRACT
            if address == OPENSEA_CONTRACT_ADDRESS.lower()
            else NFT_CONTRACT
        )
        abi_loc = (
            OPENSEA_ABI if address == OPENSEA_CONTRACT_ADDRESS.lower() else NFT_ABI
        )
        event = sighex[0]
        ress = decode_event(contract, abi_loc, event, receipt, address)
        if ress is not None:
            for res in ress:
                # print(res)
                if res["event"] == "TransferSingle":
                    # print(res['args'],res['args']['_id'],res['args']['_value'])
                    card_index = [res["args"]["_id"]]
                    quantity = [res["args"]["_value"]]
                    block = res["blockNumber"]
                    the_time = get_block_time(res["blockNumber"])
                    sender = res["args"]["_from"]
                    reciever = res["args"]["_to"]
                    log_index = res["logIndex"]
                    all_transfer_events.append(
                        {
                            "transaction_hash": transaction_hash,
                            "log_index": log_index,
                            "card_index": card_index,
                            "quantity": quantity,
                            "the_time": the_time,
                            "block": block,
                            "sender": sender,
                            "reciever": reciever,
                        }
                    )
                elif res["event"] == "TransferBatch":
                    # print(res['args'],res['args']['_ids'],res['args']['_values'])
                    card_index = res["args"]["_ids"]
                    quantity = res["args"]["_values"]
                    block = res["blockNumber"]
                    the_time = get_block_time(res["blockNumber"])
                    sender = res["args"]["_from"]
                    reciever = res["args"]["_to"]
                    log_index = res["logIndex"]
                    all_transfer_events.append(
                        {
                            "transaction_hash": transaction_hash,
                            "log_index": log_index,
                            "card_index": card_index,
                            "quantity": quantity,
                            "the_time": the_time,
                            "block": block,
                            "sender": sender,
                            "reciever": reciever,
                        }
                    )
                elif res["event"] == "OrdersMatched":
                    price = res["args"]["price"]
        # get transfers
        # print(all_transfer_events)
        for transfer_event in all_transfer_events:
            transfer_event["price"] = price
            transfer_event["currency"] = currency if price is not None else None
            all_transfer_events_withprice.append(transfer_event)
    return all_transfer_events_withprice
    # all_events.append(decode_event(contract,abi_loc,event,receipt))


def get_nft_xfer(start, stop):
    all_batch_xfer = []
    batch_xfer_events = (
        NFT_CONTRACT.events.TransferBatch()
        .createFilter(fromBlock=start, toBlock=stop)
        .get_all_entries()
    )
    if len(batch_xfer_events) > 0:
        for event in batch_xfer_events:
            all_batch_xfer = all_batch_xfer + extract_transaction_values(
                event["transactionHash"]
            )
    all_single_xfer = []
    single_xfer_events = (
        NFT_CONTRACT.events.TransferSingle()
        .createFilter(fromBlock=start, toBlock=stop)
        .get_all_entries()
    )
    if len(single_xfer_events) > 0:
        for event in single_xfer_events:
            all_single_xfer = all_single_xfer + extract_transaction_values(
                event["transactionHash"]
            )
    all_par_res = all_batch_xfer + all_single_xfer
    return all_par_res


def de_dup(xfers):
    all_trans_logs = []
    all_depduped = []
    for xfer in xfers:
        sig = xfer["transaction_hash"].hex() + str(xfer["log_index"])
        if sig not in all_trans_logs:
            all_depduped.append(xfer)
            all_trans_logs.append(sig)
    return all_depduped


# get the card sold price and date
def pull_transactions():
    last_block = NftAnalytics.objects.aggregate(Max("block"))
    last_block = last_block["block__max"]
    if last_block is None or last_block == 0:
        start = settings.START_BLOCK
    else:
        start = last_block
    # get the last block
    block = w3.eth.get_block("latest")
    stop = block["number"]
    step = 2500
    ranges = [(n, min(n + step, stop)) for n in range(start, stop, step)]
    all_par_xactions = []
    for r in ranges:
        print(r)
        xactions = de_dup(get_nft_xfer(r[0], r[1]))
        print(xactions)
        if len(xactions) > 0:
            for xaction in xactions:
                xaction_id = xaction["transaction_hash"].hex()
                xaction_dt = datetime.datetime.strptime(
                    xaction["the_time"], "%Y-%m-%d %H:%M:%S"
                )
                xfer_dict = dict(zip(xaction["card_index"], xaction["quantity"]))
                transactn_transfer = NftAnalytics.objects.create(
                    transaction_hash=xaction_id,
                    log_index=xaction["log_index"],
                    transactions=xfer_dict,
                    the_time=xaction_dt,
                    block=xaction["block"],
                    sender=xaction["sender"],
                    reciever=xaction["reciever"],
                    price=xaction["price"],
                    currency=xaction["currency"],
                )


###################
#
#### Get Transaction Events
#
#####################


def pull_mint_events():
    last_block = NftAnalytics.objects.aggregate(Max("block"))
    last_block = last_block["block__max"]
    if last_block is None or last_block == 0:
        start = settings.START_BLOCK
    else:
        start = last_block
    mint_events = (
        PAYMENT_CONTRACT.events.Mint().createFilter(fromBlock=start).get_all_entries()
    )
    if len(mint_events) > 0:
        for xfer in mint_events:
            contractid = xfer["args"]["contractId"]
            uri = xfer["args"]["uri"]
            nft_uuid = uri.split("/")[-1]
            try:
                nft = Nft.objects.get(uuid=nft_uuid)
                nft.contract_id = contractid
                nft.save()
            except (Nft.DoesNotExist, ValidationError) as err:
                print(err)
