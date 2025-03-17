import {StoryblokStory} from 'storyblok-generate-ts'

export type MultilinkStoryblok =
    | {
  cached_url?: string;
  linktype?: string;
}
    | {
  id?: string;
  cached_url?: string;
  anchor?: string;
  linktype?: "story";
  story?: {
    name: string;
    created_at?: string;
    published_at?: string;
    id: number;
    uuid: string;
    content?: {};
    slug: string;
    full_slug: string;
    sort_by_date?: null | string;
    position?: number;
    tag_list?: string[];
    is_startpage?: boolean;
    parent_id?: null | number;
    meta_data?: null | {};
    group_id?: string;
    first_published_at?: string;
    release_id?: null | number;
    lang?: string;
    path?: null | string;
    alternates?: any[];
    default_full_slug?: null | string;
    translated_slugs?: null | any[];
  };
}
    | {
  url?: string;
  cached_url?: string;
  anchor?: string;
  linktype?: "asset" | "url";
}
    | {
  email?: string;
  linktype?: "email";
};

export interface CallToActionStoryblok {
  button_type: "PRIMARY" | "SECONDARY" | "TERTIARY" | "MAGENTA";
  top_spacing?: boolean;
  left_right_spacing?: boolean;
  type: "link" | "call" | "telemedicine" | "mailto";
  target?: "_blank" | "_self" | "_phone" | "_mailto";
  text: string;
  link?: MultilinkStoryblok;
  phone?: string;
  email?: string;
  _uid: string;
  component: "call_to_action";
}

export interface MediaStoryblok {
  spacing: "default" | "narrow";
  align: "left" | "center" | "right";
  media: AssetStoryblok;
  _uid: string;
  component: "media";
}


export interface FaqStoryblok {
  question: string;
  answer: string;
  _uid: string;
  component: "faq";
}

export interface FaqSectionStoryblok {
  title: string;
  questions: FaqStoryblok[];
  _uid: string;
  component: "faq_section";
}

export interface FeatureStoryblok {
  name?: string;
  _uid: string;
  component: "feature";
}

export interface GridStoryblok {
  columns?: any[];
  _uid: string;
  component: "grid";
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
}

export interface ImageContentSectionStoryblok {
  spacing: "default" | "narrow";
  size: "small" | "large";
  title: string;
  content: any;
  call_to_action?: CallToActionStoryblok[];
  reversed?: boolean;
  rounded?: boolean;
  image_or_video: AssetStoryblok;
  _uid: string;
  component: "image_content_section";
}

export interface MarketingHeroSectionStoryblok {
  image: AssetStoryblok;
  title: string;
  description: string;
  call_to_action?: CallToActionStoryblok[];
  _uid: string;
  component: "marketing_hero_section";
}

export interface PageStoryblok {
  body?: (
      | CallToActionStoryblok
      | FaqSectionStoryblok
      | ImageContentSectionStoryblok
      | MarketingHeroSectionStoryblok
      | PdfIframeStoryblok
      | PreFooterSectionStoryblok
      | RichTextSectionStoryblok
      | VideoContentSectionStoryblok
      | TableSectionStoryblok
      )[];
  _uid: string;
  component: "page";
  uuid?: string;
}

export interface PdfIframeStoryblok {
  title: string;
  file: AssetStoryblok;
  _uid: string;
  component: "pdf_iframe";
}

export interface PreFooterSectionStoryblok {
  title: string;
  content: any;
  image: AssetStoryblok;
  call_to_action: CallToActionStoryblok[];
  _uid: string;
  component: "pre_footer_section";
}

export interface RichTextSectionStoryblok {
  title?: string;
  rich_text: any;
  divider?: boolean;
  spacing: "default" | "narrow";
  _uid: string;
  component: "rich_text_section";
}

export interface TableStoryblok {
  thead: {
    _uid: string;
    value?: string;
    component: number;
  }[];
  tbody: {
    _uid: string;
    body: {
      _uid?: string;
      value?: string;
      component?: number;
    }[];
    component: number;
  }[];
}

export interface TableSectionStoryblok {
  spacing: "default" | "narrow" | "none";
  center: boolean;
  content_margin: boolean;
  table?: TableStoryblok;
  _uid: string;
  component: "table_section";
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
}

export interface VideoContentSectionStoryblok {
  title: string;
  vimeo: VimeoVideoStoryblok[];
  quote: string;
  spacing: "default" | "narrow";
  _uid: string;
  component: "video_content_section";
}

export interface VimeoVideoStoryblok {
  url: string;
  preview: AssetStoryblok;
  _uid: string;
  component: "vimeo_video";
}

export interface ImageStoryblok {
  filename: string;
  alt: string;
}