import { TestInfo } from '@playwright/test';

// Real Enum
export enum TestStatus {
    PASSED = "PASSED",
    FAILED = "FAILED",
    SKIPPED = "SKIPPED"
}

export class TestResultUtil {

    static getTestStatus(testInfo: TestInfo): TestStatus {

        if (testInfo.status === "passed") {
            return TestStatus.PASSED;
        }

        if (testInfo.status === "failed") {
            return TestStatus.FAILED;
        }

        if (testInfo.status === "skipped") {
            return TestStatus.SKIPPED;
        }

        return TestStatus.FAILED;
    }

    static printTestDetails(testInfo: TestInfo) {

        const status = this.getTestStatus(testInfo);

        console.log("----------- Test Details -----------");
        console.log("Test Name:", testInfo.title);
        console.log("Status:", status);
        console.log("Duration:", testInfo.duration);
        console.log("File:", testInfo.file);
        console.log("------------------------------------");
    }
}