export const getResumeViewUrl = (url) => {

    if (!url) {

        return "";

    }

    if (
        url.endsWith(".pdf")
    ) {

        return url;

    }

    return `${url}.pdf`;

};