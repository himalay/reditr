/**
    MediaParser class
    All parsing methods must have format:
        hanleMedia(url, callback)
*/

class MediaParser {

    /** Method that delegates to the correct media type  */
    parse(url, callback) {

        this.regex = {
            IMGUR_ALBUM: /(http|https):\/\/*(.?)imgur.com\/(a|gallery)\/([a-zA-Z0-9]{5,})/gi,
            IMGUR_IMAGE: /(http|https):\/\/*(.?)imgur.com\/([a-zA-Z0-9]{5,})$/gi,
            IMGUR_RAW_IMAGE: /(http|https):\/\/*(.?)i.imgur.com/gi
        }

        if (this.regex.IMGUR_ALBUM.test(url)) {
            this.handleImgurAlbum(url, callback)
        } else if (this.regex.IMGUR_IMAGE.test(url)) {
            this.handleImgurImage(url, callback)
        } else if (this.regex.IMGUR_RAW_IMAGE.test(url)) {
            this.handleImgurRawImage(url, callback)
        }

    }

    /** Simply adds .png to the url, imgur auto handles if it's a gif or not */
    handleImgurImage(url, callback) {
        callback({
            url: url,
            parsedUrl: url + ".png", // probably a smarter way to do this
            type: "image"
        })
    }

    /** returns consistent object for image */
    handleImgurRawImage(url, callback) {
        callback({
            url: url,
            parsedUrl: url, // probably a smarter way to do this
            type: "image"
        })
    }

    /** Will do nothing useful for now */
    handleImgurAlbum(url, callback) {
        callback({
            type: "ignore"
        })
    }

}

export default MediaParser
