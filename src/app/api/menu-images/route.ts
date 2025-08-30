import { NextResponse } from "next/server";

export async function GET() {
  const images = {
    1: "/assets/img/kanin.jpg",
    2: "/assets/img/buttermilk.jpg",
    3: "/assets/img/Pork_Adobo.jpg",
    4: "/assets/img/porkchop.jpg",
    5: "/assets/img/egg.jpg",
    6: "/assets/img/Spaghetti.jpg",
    7: "/assets/img/carbonara.jpg",
    8: "/assets/img/bihon.jpg",
    9: "/assets/img/dinuguan.jpg",
    10: "/assets/img/bopis.jpg",
    11: "/assets/img/smol_wotoh.jpg",
    12: "/assets/img/spront.jpg",
    13: "/assets/img/conk.jpg",
    14: "/assets/img/big_wotoh.jpg",
  };

  return NextResponse.json(images);
}
