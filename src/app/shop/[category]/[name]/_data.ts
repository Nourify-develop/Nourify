export const route = (category: string, title: string) => [
  {
    title: "Products",
    link: "/shop"
  },
  {
    title: `${category}`,
    link: `/shop?category=${category}`
  },
  {
    title: `${title}`,
    link: `/shop/${category}/${title}`
  }
]

export const size = [
  {
    title: "Small",
    key: "small"
  },
  {
    title: "Medium",
    key: "medium"
  },
  {
    title: "Large",
    key: "large"
  },
]

export const reviewDrop = [
  {
    title: "Most Recent",
    key: "most-recent"
  },
  {
    title: "Most Relevant",
    key: "most-relevant"
  },
  {
    title: "Rating",
    key: "rating"
  },
]