from django.conf import settings
from web3 import Web3

from crypto.utils import abis

w3 = Web3(Web3.HTTPProvider(settings.ETH_RPC_URL))

PAY_MINT_ABI = abis.PAY_MINT_ABI


class PayMintContract:
    def __init__(self):
        pay_mint_contract = w3.eth.contract(
            address=settings.CONTRACT_ADDRESS_PAY_MINT, abi=PAY_MINT_ABI
        )

        self.contract = pay_mint_contract

    def createMintTxn(self, total_cost, supply, uuid, fees=[]):

        gas_price = 100000000000
        nonce = 1
        txn = self.contract.functions.payMint(fees, supply, uuid).buildTransaction(
            {
                # 'value': total_cost,
                "gas": 500000,
                "gasPrice": gas_price,
                "nonce": nonce,
                "chainId": settings.CHAIN_ID,
            }
        )
        return txn, total_cost
