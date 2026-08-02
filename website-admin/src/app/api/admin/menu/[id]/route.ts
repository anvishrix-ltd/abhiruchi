export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function mapItem(item: any) {
  return {
    id: item.id,
    name: item.name,
    desc: item.description ?? "",
    price: item.price,
    category: item.category.name,
    veg: item.isVegetarian,
    emoji: item.emoji ?? "🍛",
    popular: item.isPopular,
    hero: item.isHero,
    available: item.isAvailable,
    availabilityType: item.availabilityType ?? "both",
    allergens: (() => { try { return JSON.parse(item.allergens ?? "[]"); } catch { return []; } })(),
    variants: (() => { try { return JSON.parse(item.variants ?? "[]"); } catch { return []; } })(),
    image: item.image ?? null,
  };
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const data: any = {};
    if (body.name !== undefined) {
      const trimmedName = typeof body.name === "string" ? body.name.trim() : "";
      if (!trimmedName) return NextResponse.json({ error: "Item name is required" }, { status: 400 });
      data.name = trimmedName;
    }
    if (body.desc !== undefined) data.description = body.desc;
    if (body.price !== undefined) {
      const priceNum = typeof body.price === "number" ? body.price : parseFloat(body.price);
      if (!Number.isFinite(priceNum) || priceNum < 0) return NextResponse.json({ error: "A valid price is required" }, { status: 400 });
      data.price = priceNum;
    }
    if (body.emoji !== undefined) data.emoji = body.emoji;
    if (body.veg !== undefined) data.isVegetarian = body.veg === "veg";
    if (body.available !== undefined) data.isAvailable = body.available;
    if (body.availabilityType !== undefined) data.availabilityType = body.availabilityType;
    if (body.allergens !== undefined) data.allergens = JSON.stringify(Array.isArray(body.allergens) ? body.allergens : []);
    if (body.variants !== undefined) data.variants = JSON.stringify(Array.isArray(body.variants) ? body.variants : []);

    if (body.category !== undefined) {
      const cat = await prisma.menuCategory.findFirst({ where: { name: body.category } });
      if (cat) data.categoryId = cat.id;
    }

    const item = await prisma.menuItem.update({
      where: { id },
      data,
      include: { category: { select: { name: true } } },
    });

    try {
      await prisma.adminActivityLog.create({
        data: { action: "menu_update", detail: `Menu item ${id} updated`, entityId: id },
      });
    } catch { /* non-fatal */ }

    return NextResponse.json(mapItem(item));
  } catch (err) {
    console.error("[menu PATCH]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    // Read first: once it's gone the name can't be recovered for the log entry
    const item = await prisma.menuItem.findUnique({ where: { id }, select: { name: true, price: true } });
    await prisma.menuItem.delete({ where: { id } });

    // Deletions were previously unrecorded, so vanished dishes left no trace of
    // whether anyone removed them from the admin.
    try {
      await prisma.adminActivityLog.create({
        data: {
          action: "menu_delete",
          detail: `Menu item deleted: ${item?.name ?? id}${item ? ` (£${item.price})` : ""}`,
          entityId: id,
        },
      });
    } catch { /* non-fatal */ }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[menu DELETE]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
