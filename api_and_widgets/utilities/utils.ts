function checkResponse(error: any, response: any) {
    if (error) {
        console.log("Error in API call")
    }
    if (response.statusCode == 200 || response.statusCode == 201) {
        return JSON.parse(response.body)
    } else {
        if (response.statusCode == 401) {
            console.log("Invalid access token")
        }
        if (response.statusCode == 402) {
            console.log("Unable to create submission")
        }
        if (response.statusCode == 400) {
            const body = JSON.parse(response.body)
            console.log("Error code: " + body.error_code + ", details available in the message: " + body.message)
        }
    }
}

export { checkResponse }