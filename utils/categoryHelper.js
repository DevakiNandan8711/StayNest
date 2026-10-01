function categorizeListing(listing) {
    if (!listing) return ["trending"];

    const title = (listing.title || "");
    const description = (listing.description || "");
    const location = (listing.location || "");
    const country = (listing.country || "");
    const text = `${title} ${description} ${location} ${country}`.toLowerCase();

    const categories = new Set();

    // If listing has explicit category stored
    if (listing.category && typeof listing.category === "string" && listing.category.trim() && listing.category !== "trending") {
        categories.add(listing.category.toLowerCase().trim());
    }

    // Mountain
    if (/mountain|alps|chalet|ski|snow|hill|peak|summit|rockies|banff|aspen|highland|verbier|cliff|himalaya/.test(text)) {
        categories.add("mountain");
    }

    // Arctic
    if (/arctic|snow|ice|ski|chalet|winter|glacier|alps|verbier|aspen|frozen|polar/.test(text)) {
        categories.add("arctic");
    }

    // Cities
    if (/city|cities|skyline|urban|downtown|metro|apartment|penthouse|loft|dubai|tokyo|new york|boston|miami|amsterdam|paris|london|florence|charleston|rome|berlin|singapore/.test(text)) {
        categories.add("cities");
    }

    // Rooms
    if (/room|rooms|suite|studio|apartment|loft|condo|flat|cottage|brownstone|bed|villa|cabin|chalet|house|home|stay/.test(text)) {
        categories.add("rooms");
    }

    // Castles
    if (/castle|palace|mansion|fort|chateau|historic|villa|tuscany|scotland|heritage|royal|monument|estate/.test(text)) {
        categories.add("castles");
    }

    // Pools / Beach
    if (/pool|pools|beach|beachfront|sea|ocean|coast|coastal|water|lake|island|resort|swim|swimming|bay|tropical|bungalow|maldives|bali|cancun|mykonos|fiji|phuket|nassau|bahamas|costa rica/.test(text)) {
        categories.add("pools");
    }

    // Camping
    if (/camp|camping|treehouse|tent|glamping|cabin|log cabin|nature|forest|wood|woods|jungle|park|lake|safari|retreat|unplug|outdoor|serengeti/.test(text)) {
        categories.add("camping");
    }

    // Farms
    if (/farm|farms|barn|ranch|cow|pasture|countryside|safari|serengeti|wildlife|tanzania|cotswolds|rural|vineyard/.test(text)) {
        categories.add("farms");
    }

    // Domes
    if (/dome|domes|igloo|cave|cappadocia|treehouse|eco|pod|hut|unique|earth|yurt/.test(text)) {
        categories.add("domes");
    }

    // Trending: luxury stays, popular spots, or high price
    if (/trending|luxury|paradise|resort|oasis|exclusive|retreat|island|penthouse|chalet|skyline/.test(text) || (listing.price && Number(listing.price) >= 2000) || categories.size === 0) {
        categories.add("trending");
    }

    return Array.from(categories);
}

async function backfillCategories(Listing) {
  try {
    const listings = await Listing.find({});
    for (let l of listings) {
      if (!l.category || l.category === "trending") {
        const cats = categorizeListing(l);
        const bestCat = cats.find(c => c !== "trending") || "trending";
        l.category = bestCat;
        await l.save();
      }
    }
    console.log("Category sync: All listings in DB successfully updated.");
  } catch (err) {
    console.error("Category sync error:", err.message);
  }
}

module.exports = {
  categorizeListing,
  backfillCategories
};
