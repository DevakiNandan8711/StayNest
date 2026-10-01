const categoryMap = {
  "Cozy Beachfront Cottage": "pools",
  "Modern Loft in Downtown": "rooms",
  "Mountain Retreat": "mountain",
  "Historic Villa in Tuscany": "castles",
  "Secluded Treehouse Getaway": "camping",
  "Beachfront Paradise": "trending",
  "Rustic Cabin by the Lake": "camping",
  "Luxury Penthouse with City Views": "cities",
  "Ski-In/Ski-Out Chalet": "arctic",
  "Safari Lodge in the Serengeti": "farms",
  "Historic Canal House": "cities",
  "Private Island Retreat": "pools",
  "Charming Cottage in the Cotswolds": "farms",
  "Historic Brownstone in Boston": "cities",
  "Beachfront Bungalow in Bali": "pools",
  "Mountain View Cabin in Banff": "mountain",
  "Art Deco Apartment in Miami": "rooms",
  "Tropical Villa in Phuket": "pools",
  "Historic Castle in Scotland": "castles",
  "Desert Oasis in Dubai": "trending",
  "Rustic Log Cabin in Montana": "mountain",
  "Beachfront Villa in Greece": "pools",
  "Eco-Friendly Treehouse Retreat": "domes",
  "Historic Cottage in Charleston": "rooms",
  "Modern Apartment in Tokyo": "cities",
  "Lakefront Cabin in New Hampshire": "camping",
  "Luxury Villa in the Maldives": "pools",
  "Ski Chalet in Aspen": "arctic",
  "Secluded Beach House in Costa Rica": "trending",
  "All-Inclusive Tropical Island Resort": "trending"
};

function getListingCategory(listing) {
  if (listing && listing.category && listing.category !== "trending") {
    return listing.category.toLowerCase();
  }
  if (listing && listing.title && categoryMap[listing.title]) {
    return categoryMap[listing.title].toLowerCase();
  }
  return (listing && listing.category) ? listing.category.toLowerCase() : "trending";
}

async function backfillCategories(Listing) {
  try {
    const titles = Object.keys(categoryMap);
    const bulkOps = titles.map(title => ({
      updateMany: {
        filter: { title: title },
        update: { $set: { category: categoryMap[title] } }
      }
    }));
    if (bulkOps.length > 0) {
      await Listing.bulkWrite(bulkOps);
      console.log("Category sync: All listings in DB successfully updated with categories.");
    }
  } catch (err) {
    console.error("Category sync error:", err.message);
  }
}

module.exports = {
  categoryMap,
  getListingCategory,
  backfillCategories
};
