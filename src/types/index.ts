export interface HexArticle {
  id: string
  x: number
  y: number
  coverUrl?: string
  text?: string
}

export interface Hexagon {
  id: string
  x: number
  y: number
  coverUrl?: string
  text?: string
}

export interface Images {
  [id: string]: HTMLImageElement
}

export interface Article {
  id: string
  cover: {
    url: string
  }
  title: string
  category: {
    image: {
      url: string
    }
  }
}
