import request from "request"
import * as fs from "fs"
import { checkResponse } from "../utilities/utils"


const accessToken: string = ""
const endpoint: string = "https://fe530c0e.compilers.sphere-engine.com/api/v4"

interface Submission {
    source: string
    compilerId: number
    input?: string
}


// Test the API
function testAPI() {
    request({
            url: `${endpoint}/test?access_token=${accessToken}`,
            method: "GET",
        }, function (error: any, response: any) {

        console.log(checkResponse(error, response))
        }
    )
}

// Add a new submission
function addNewSubmission(submission: Submission) {
    request({
            url: `${endpoint}/submissions?access_token=${accessToken}`,
            method: "POST",
            form: submission
        }, function (error: any, response: any) {

        response = checkResponse(error, response)

        setTimeout(() => {
        getSubmission(response.id)
        }, 5000)}
    )
}


// Get submission details
function getSubmission(responseId: number) {

    request({
            url: `${endpoint}/submissions/${responseId}?access_token=${accessToken}`,
            method: "GET",
        }, function (error: any, response: any) {

        console.log(checkResponse(error, response))
        }
    )

}

function readFile(name: string): string {
    return fs.readFileSync(`./resources/${name}`, "utf8")
}


const submit: Submission = {compilerId: 114, source: readFile("testFile.go"), input: readFile("testInput.in")}
// addNewSubmission(submit)

testAPI()



