import { create } from "zustand";
const domain = "http://localhost:3001";
const NewsStore = (set: any) => ({
  articles: [],
  getAllArticles: async () => {
    const res = await fetch(`${domain}/news`);
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    set({
      articles: data.paginated,
    });
  },
});

const useNewsStore = create(NewsStore);
export default useNewsStore;
