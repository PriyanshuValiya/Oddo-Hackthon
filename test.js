import Mfund from "mfundinfo";

const mfInstance = new Mfund();

async function test() {
  try {
    console.log("Testing getSchemeCode...");
    const schemeCode = await mfInstance.getSchemeCode("ICICI Prudential Banking and PSU Debt Fund - Quarterly IDCW");
    console.log("Scheme Code:", schemeCode);

    console.log("Testing latestNav...");
    const latestNav = await mfInstance.latestNav("119551");
    console.log("Latest NAV:", latestNav);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

test();
