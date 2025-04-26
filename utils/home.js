/**
 * Accumulates banner data for specified languages.
 *
 * @param {Object} banners - The object containing banner paths and file types.
 * @param {Object} initialData - The initial data object to accumulate results into.
 * @returns {Object} - The accumulated data object.
 */
function accumulateBannerData(banners, initialData = {}) {
  const languages = ["am", "ru", "en"];

  return languages.reduce(
    (acc, lang) => {
      acc[`path_${lang}`] =
        banners[`path_${lang}`]?.[0]?.[`path_${lang}`] || "";
      acc[`file_type_${lang}`] =
        banners[`path_${lang}`]?.[0]?.[`file_type_${lang}`] || "";
      return acc;
    },
    { ...initialData }
  );
}

export { accumulateBannerData };
