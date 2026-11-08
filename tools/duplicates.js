// Two pages are duplicates if both exist and their titles match.
function isDuplicate(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.title === pageB.title;
}

function hasSameOwner(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.ownerId === pageB.ownerId;
}

function hasSameTag(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }
  return pageA.tag === pageA.tag;
}

module.exports = { isDuplicate, hasSameOwner, hasSameTag };
