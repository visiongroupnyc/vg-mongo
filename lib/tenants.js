function getTenantPattern(tenant) {
  return `${tenant.toLowerCase().split(' ').join('')}`;
}

module.exports = getTenantPattern;
