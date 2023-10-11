import { getMock } from "../mocks";

interface ICategory {
  title: string;
  url: string;
}
interface IArticle {
  id: number;
  title: string;
  author: string;
  content: string;
  category: string;
  image: string;
  createdAt: string;
  allowComments: boolean;
  status: "public" | "draft";
}
class ArticleDataService {
  private static instance: ArticleDataService;
  private constructor() {}
  private articles: { [key: string]: IArticle } = {};
  private navigation: number[] = [];
  public static getInstance(): ArticleDataService {
    if (!ArticleDataService.instance) {
      ArticleDataService.instance = new ArticleDataService();
    }
    return ArticleDataService.instance;
  }
  getNavigation() {
    if (Array.isArray(this.navigation) && this.navigation.length === 0) {
      this.navigation = getMock.articles.map((article) => article.id);
    }
    return this.navigation;
  }
  getArcticle(id: number) {
    if (!this.articles[id]) {
      this.articles[id] = getMock.articles.find(
        (article) => article.id === id
      ) as unknown as IArticle;
    }
    return this.articles[id];
  }
}
