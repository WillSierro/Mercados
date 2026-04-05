export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(value) || 0);
}

export function formatShortDate(value) {
  const date = new Date(`${value}T12:00:00`);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit"
  }).format(date);
}

export function calculateDiscount(offer) {
  const oldPrice = Number(offer.oldPrice);
  const price = Number(offer.price);

  if (!oldPrice || oldPrice <= price) {
    return 0;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function getInitials(title) {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function isLiveOffer(offer) {
  if (!offer.active) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const limit = new Date(`${offer.validUntil}T12:00:00`);
  limit.setHours(0, 0, 0, 0);

  return limit >= today;
}

export function parseDateInput(value) {
  const raw = value.trim();

  if (!raw) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split("/");
    return `${year}-${month}-${day}`;
  }

  return null;
}

export function getVisibleOffers({
  offers,
  selectedStoreId,
  currentMode,
  feed,
  category,
  search,
  sortBy,
  featuredOnly
}) {
  const term = search.trim().toLowerCase();

  return offers
    .filter((offer) => {
      if (!isLiveOffer(offer)) {
        return false;
      }

      if (!offer.allStores && offer.storeId !== selectedStoreId) {
        return false;
      }

      if (!offer.modes.includes(currentMode)) {
        return false;
      }

      if (feed === "club" && !offer.club) {
        return false;
      }

      if (category !== "Todas" && offer.category !== category) {
        return false;
      }

      if (featuredOnly && !offer.featured) {
        return false;
      }

      if (!term) {
        return true;
      }

      const haystack = `${offer.title} ${offer.description} ${offer.category}`.toLowerCase();
      return haystack.includes(term);
    })
    .sort((left, right) => {
      if (sortBy === "discount") {
        return calculateDiscount(right) - calculateDiscount(left);
      }

      if (sortBy === "price-low") {
        return Number(left.price) - Number(right.price);
      }

      if (sortBy === "price-high") {
        return Number(right.price) - Number(left.price);
      }

      const scoreLeft = Number(left.featured) * 20 + Number(left.club) * 10 + calculateDiscount(left);
      const scoreRight = Number(right.featured) * 20 + Number(right.club) * 10 + calculateDiscount(right);

      return scoreRight - scoreLeft || right.createdAt - left.createdAt;
    });
}
