

function convertToLowerCase(str: string): string {
  return str.toLowerCase();
}

export function searchFilters(
  search: string
): (value: PaginatedData) => any {
  return ({ companyName, labels, borrower: { user } }): boolean =>
    (
      convertToLowerCase(user.firstName) +
      convertToLowerCase(user.lastName) +
      convertToLowerCase(companyName) +
      convertToLowerCase(user.email) +
      labels?.map(convertToLowerCase)
    ).includes(search.toLowerCase());
}
