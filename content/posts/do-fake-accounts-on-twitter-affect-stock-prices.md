---
title: "Do fake accounts on twitter affect stock prices?"
date: "2022-11-12"
description: "An experiment in fake accounts, market signals, and the difficulty of drawing a useful conclusion."
category: analysis
tags: ["analysis"]
source: "https://medium.com/@mrichard91/do-fake-accounts-on-twitter-affect-stock-prices-3ca440e562bd"
---

![](/media/medium/7b4dbfa244e96d36.png)

Dall-e generated image for “stock chart with price falling because of a tweet”

There are several [stories](https://www.msn.com/en-us/money/companies/no-insulin-is-not-free-eli-lilly-is-the-latest-high-profile-casualty-of-elon-musk-s-twitter-verification-mess/ar-AA140CWJ) circulating today about the idea that fake twitter accounts, impersonating publicly traded companies and getting a blue check mark, might have affected their stock price by tweeting material statements. In this article, I will examine the facts to see if there is a possible relationship between the tweets and change in stock price of the affected companies.

tl;dr —

-   the stock LLY has regular up and down swings in the same range and circumstances as the change claimed to be caused by the tweet,
-   the method of dissemination of the information was unlikely to reach or influence investors,
-   the timeline of events does not suggest the same causation of tweet to price movement as historical examples;
-   there is no evidence the stock movement was out of the ordinary, or that the tweet was likely to affect the price

#### Timeline of Events

Here’s a quick timeline:

_Nov 9 — Twitter changes blue check verification policy_

_Nov 10 1:36pm — impersonating account “EliLillyandCo” tweets_

_Nov 10 4:00pm — LLY stock closes at $368.72, just below intraday high and $1 below 52-week high_

_Nov 10 4:09pm — official account “LilyPad” tweets an apology for confusion, gives corrects the record_

_Nov 11 9:30am — LLY opens at $366.16, a fall of about 0.7%_

_Nov 11 11:00am LLY falls to $346.47, a fall of about 6% since open_

_Nov 11 4:00pm LLY closes at $352.30, a fall of about 4.5%_

#### Full Context

On November 9, 2022 Twitter changed the meaning of the blue check mark on their site to have a dual meaning where previously it indicated verified account status. From the [help article](https://help.twitter.com/en/managing-your-account/about-twitter-verified-accounts) describing these changes —

> “Now the blue checkmark may mean two different things: either that an account was verified under the previous verification criteria (active, notable, and authentic), or that the account has an active subscription to Twitter’s new [Twitter Blue subscription service](https://help.twitter.com/en/using-twitter/twitter-blue.html), which was made available on iOS in the US, Canada, Australia New Zealand and the UK on November 9, 2022.”

The following day an account impersonating the Eli Lily brand tweeted that “insulin is free now”, presumably reducing their future profit on sales.

![](/media/medium/20763749c56f2741.jpg)

The following day Eli Lily stock (ticker: LLY) dropped over 4%. The hot takes from news media and the twitter-verse included headlines like [“Eli Lilly Dives After Fake Twitter Account Promises Free Insulin; Takes Novo Nordisk, Sanofi With It”](https://www.investors.com/news/technology/lly-stock-dives-taking-novo-sanofi-with-it-after-fake-twitter-account-promises-free-insulin/). Notably such articles hedge the click-baity headlines with statements like this

> “But that didn’t stop LLY stock from falling 4.5% to 352.30 on today’s stock market. Health care stocks were broadly pummeled Friday as well.”

[Tweets like this](https://twitter.com/rafaelshimunov/status/1591135071142313984) shared the news in dramatic fashion:

![](/media/medium/56445dee857a82d4.png)

#### Analytical Questions

To get to the question at hand — did this impersonating tweet cause the Eli Lily stock LLY to drop? Or are there other reasonable explanations? Let’s consider two questions —

1.  Is the change in LLY stock unexpected or otherwise outside the bounds of historical trading activity?
2.  Could market investors consider this new blue check mark account to be the official position of Eli Lily?

#### LLY Stock

If we take a look at the ticker chart for LLY over the last 6 months we can see a pattern familiar to many stock traders — the price has sharp rises and sharp falls over time. Relevant to our discussion, the stock sometimes falls more than 3%, often after it has risen significantly. In the month leading up to the November 11th 4.4% drop LLY had gained close to 10%.

![](/media/medium/1187ca7385bb61d7.png)

LLY ticker from Yahoo finance 6 months ending 11/12/2022

Now let us ask the question of how many times did the LLY stock drop more than 3%? What were the circumstances at the time? In the chart below I calculate the percentage of change from close to close (day\_change) and the previous 20 day window change (not including date of drop). Here you can see that leading up to the drop on 11/11/2022 there was a 10% increase, which is similar to trading days on 1/12/2021, 6/11/2021, 12/17/2021, 5/31/2021, 6/9/2021. Each of these had a run up of at least 8% followed by a drop of 3%.

![](/media/medium/ba916cc469d98b45.png)

Daily Drops of > 3% in LLY 11/20–11/22

Based on historical trading data my conclusion is that the drop on 11/11/2022 falls well within the historical performance of the stock given the surrounding circumstances. This is a common pattern in technology and pharmaceutical stocks — big run up, followed by profit taking declines.

#### Authenticity of Information

The second question to ask is if investors could have reasonably believed this new account to be the official representation of Eli Lily and thus acted on the information.

The official Eli Lily Twitter account has been available since July 2010 and is linked from the official investor page [https://investor.lilly.com/](https://investor.lilly.com/). Generally speaking, for news of this magnitude, a company would be required to disclose the information to investors through established official channels. In this case neither the investor page or any linked social media accounts provided any disclosure to fall in line. It seems unlikely that even an amateur investor would have found the impersonation account on November 10th, waited until after the official account refuted the information, and then sold on November 11th based on this information.

Let us also contrast this event to a [historical example](https://business.time.com/2013/04/24/how-does-one-fake-tweet-cause-a-stock-market-crash/) of a tweet causing market movements. In 2013, one week after the Boston Marathon bombing, the Associated Press twitter account was compromised and tweeted news of a bombing at the White House. The market lost 0.9% almost instantly after the tweet, recovering shortly after the fake tweet was taken down and explained.

![](/media/medium/f29cfb354cc19448.jpg)

AP tweet in 2013 and corresponding temporary drop in DOW

The current example differs significantly from the AP event. First, the AP tweet came from the official AP account, already followed by a large audience of investors. Second, the drop in the market was almost immediate, followed by a quick recovery when the record was corrected. The imposter Eli Lily tweet occurred on the previous trading day and after the record had been corrected with amply opportunity for investors to seek reliable information.

Finally, here are a few other points to consider:

1.  Brands have a hard time managing their own assets, and a harder time stopping impersonation accounts on all platforms. On Twitter alone, there are at least 12 different official looking Twitter accounts for Eli Lily divisions around the world. Some have blue check marks, some don’t. There are also accounts that are clearly not official using the same iconography and naming that have been on Twitter for more than 2 years.
2.  From screenshots, the reach of the impersonation Eli Lily account reached an audience between 3k-5k users. Relatively speaking this is tiny and not newsworthy. For this tweet to have moved the stock so dramatically with so little visibility seems highly unlikely.
