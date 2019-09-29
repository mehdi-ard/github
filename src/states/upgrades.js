function filterEmptyOptions(item) {
  return item.options.length !== 0 || item.answerType === 3;
}

function filterEmptyTitle(item) {
  return item.title !== '';
}

function mapEmptyOptions(item) {
  return {
    ...item,
    options: item.options.filter(filterEmptyTitle)
  };
}

export default {
  questions: items => {
    return (items || [])
      .filter(filterEmptyTitle)
      .filter(filterEmptyOptions)
      .map(mapEmptyOptions)
      .filter(filterEmptyOptions);
  },
  isPublic: value => (value === null ? true : value === 'true'),
  isPublicResult: value => (value === null ? true : value === 'true')
};
