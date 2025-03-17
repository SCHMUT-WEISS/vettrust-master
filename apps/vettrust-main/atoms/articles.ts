import { atom } from "jotai";
import { BlogArticleFields } from "@somethingcreative-agency/vettrust-design_system";

/* The data for each blog article displayed under /blog/[blog_slug] or /news/[news_slug] lies in this atom */
export const currentBlogArticleAtom = atom<BlogArticleFields | null>(null);
