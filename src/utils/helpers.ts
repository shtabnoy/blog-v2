const imagesUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : ''

export const loadImage = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = `${imagesUrl}${url}`
    img.onload = (event) => resolve(event.target)
    img.onerror = (err) => reject(err)
  })
