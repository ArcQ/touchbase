import React, { ReactNode, ReactElement } from "react";
import Nav, { NavLink, NavGroup, NavGroupItem } from "components/Nav";
import useFeature from "hooks/useFeature";
import BetaTag from "components/BetaTag";
import EarthenSvg from "components/EarthenSvg";
import MarcolianSvg from "components/MarcolianSvg";
import AugencoreSvg from "components/AugencoreSvg";
import KathariSvg from "components/KathariSvg";
import ShroudSvg from "components/ShroudSvg";
import $if from "util/$if";

export type Props = {
  children: ReactNode;
};

export default function MainNav(): ReactElement {
  const pd3Redeem = useFeature("redeemables_pd3_redeem");

  return (
    <Nav>
      <NavGroup title="Parallels">
        <NavGroupItem href="/story/">The Story</NavGroupItem>
        <NavGroupItem href="/parallels/earthen/">
          <div className="flex flex-row items-center justify-between grow gap-4">
            Earthen
            <EarthenSvg size={24} />
          </div>
        </NavGroupItem>
        <NavGroupItem href="/parallels/marcolian/">
          <div className="flex flex-row items-center justify-between grow gap-4">
            Marcolian
            <MarcolianSvg size={24} />
          </div>
        </NavGroupItem>
        <NavGroupItem href="/parallels/augencore/">
          <div className="flex flex-row items-center justify-between grow gap-4">
            Augencore
            <AugencoreSvg size={24} />
          </div>
        </NavGroupItem>
        <NavGroupItem href="/parallels/kathari/">
          <div className="flex flex-row items-center justify-between grow gap-4">
            Kathari
            <KathariSvg size={24} />
          </div>
        </NavGroupItem>
        <NavGroupItem href="/parallels/the-shroud/">
          <div className="flex flex-row items-center justify-between grow gap-4">
            Shroud
            <ShroudSvg size={24} />
          </div>
        </NavGroupItem>
      </NavGroup>

      <NavLink href="/cards/">Cards</NavLink>

      <NavGroup title="Tools">
        <NavGroupItem href="https://inb0x.life">Inb0x</NavGroupItem>
        <NavGroupItem href="https://parasets.parallel.life">
          Parasets
        </NavGroupItem>
      </NavGroup>

      <NavGroup title="Resources">
        {/* PD2 */}
        <NavGroupItem href="/packs/pdii/my-packs/">PDII Packs</NavGroupItem>
        <NavGroupItem href="/echelon/cache/collect/">
          PDII Redeemables
        </NavGroupItem>
        {/* PD3 */}
        <NavGroupItem href="/redeemables/pd3/">
          PDIII Pack Reservation Pickup
        </NavGroupItem>
        {$if(pd3Redeem, () => (
          <NavGroupItem href="/redeemables/pd3/redeem/">
            PDIII Redeemables
          </NavGroupItem>
        ))}
        <NavGroupItem href="/faq/">Frequently Asked Questions</NavGroupItem>
      </NavGroup>

      <NavLink href="/paradox/">
        Paradox <BetaTag />
      </NavLink>
    </Nav>
  );
}
