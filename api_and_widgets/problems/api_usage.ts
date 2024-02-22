import request from "request";
import {checkResponse} from "../utilities/utils";

const accessToken: string = ""
const endpoint: string = "https://fe530c0e.problems.sphere-engine.com/api/v4"

function testAPI() {
    request({
            url: `${endpoint}/test?access_token=${accessToken}`,
            method: "GET",
        }, function (error: any, response: any) {

            console.log(checkResponse(error, response))
        }
    )
}

interface Problem {
    name: string
    body?: string
    typeId?: number
    masterjudgeId: number
}

const prb: Problem = {
    name: "FizzBuzz",
    body: "FizzBuzz is a classic programming exercise that draws its name from a children's game. However, despite its seemingly playful origins, it has become a widely used assessment tool in the world of programming interviews. FizzBuzz serves as a fundamental test to evaluate a programmer's grasp of basic control flow, conditionals, and iteration.\n" +
        "\n" +
        "The essence of FizzBuzz lies in the sequential counting of numbers from 1 to a specified limit. Participants must apply specific rules to each number in the sequence. If a number is divisible by 3, they should output \"Fizz.\" If divisible by 5, the output is \"Buzz.\" When a number satisfies both conditions, the output is \"FizzBuzz.\" Otherwise, the program should simply display the current number.",
    typeId: 4,
    masterjudgeId: 1000
}

function createProblem(problem: Problem) {
    request({
            url: `${endpoint}/problems?access_token=${accessToken}`,
            method: "POST",
            form: problem
        }, function (error: any, response: any) {

            console.log(checkResponse(error, response))
        }
    )
}

interface TestCase {
    input: string
    output: string
    timelimit: number
    judgeId: number
}

const tstCase1: TestCase = {
    input: "3",
    output: "Fizz",
    timelimit: 3,
    judgeId: 1
}

const tstCase2: TestCase = {
    input: "3 5 15",
    output: "Fizz Buzz FizzBuzz",
    timelimit: 5,
    judgeId: 1
}



function addTestCases(problemId: number, testCase: TestCase[]) {
    testCase.forEach((tstCase) => {
        request({
                url: `${endpoint}/problems/${problemId}/testcases?access_token=${accessToken}`,
                method: "POST",
                form: tstCase
            }, function (error: any, response: any) {

                console.log(checkResponse(error, response))
            }
        )
    })
}

function getProblems() {
    request({
            url: `${endpoint}/problems?access_token=${accessToken}&limit=100`,
            method: "GET",
        }, function (error: any, response: any) {

            console.log(checkResponse(error, response))
        }
    )
}

// testAPI()
// createProblem(prb)
// addTestCases(132820, [tstCase1, tstCase2])
getProblems()