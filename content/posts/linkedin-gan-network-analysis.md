---
title: "LinkedIn GAN Network Analysis"
date: "2022-02-10"
description: "Following connections through a network of likely inauthentic LinkedIn profiles."
category: security
tags: ["threat-intelligence","synthetic-identities"]
source: "https://medium.com/@mrichard91/linkedin-gan-network-analysis-de55a0b6526e"
---

#### In this analysis we look at a network of likely inauthentic LinkedIn profiles that use common Tactics, Techniques and Procedures (TTPs) to connect with legitimate users. These TTPs include using GAN profile pictures and patterned profile activities. These accounts can be detected through profile picture analysis for GANs and evaluation of profile data for matches to the patterns. I’ll be covering GAN detection specifically in my next article.

Here are all the GAN profile pictures from this network — see the pattern?

![](/media/medium/b224d5c77da3dee2.png)

GAN profile photos from the network

While this analysis does not conclude with any concrete attribution of who created the profiles, there are clues that the actor may be leveraging machine learning and browser automation to scale their techniques. This scale and automation allows for more efficient data collection, broader targeting and more resilience to service provider remediations.

Fake profiles on social media are actively used by bad actors to create connections, research, communicate and sometimes send malicious content to targeted users. This technique maps with ATT&CK T1585.001 — “Establish Accounts: Social Media Accounts” and is mitigated with DS0021.

It is difficult to say how significant the risk of these profiles connecting to an individual or organization might be. These profiles may be a more benign research project that stumbled upon sensitive groups or they may be explicitly targeting these demographics. There is no data in this analysis about how these profiles are ultimately used — do they contact connections, read the data from the networks or something else?

### Analysis

On February 7th, 2022 I analyzed a LinkedIn profile for “Megan Brewer” (now taken down) claiming to be a Business Analyst at Google. When I first viewed the profile it struck me as odd — a profile picture that looked computer generated, a work history that was brief, daily reposting of news stories unrelated to the profiles listed profession.

Reviewing the connections of this profile showed a pattern of connecting with investigators in the tech industry. These connections may have been opportunistic or more targeted, but based on the available data it’s impossible to tell.

This initial profile led to additional profiles exhibiting the same TTPs. The method I used for discovery method was to look at connections, experiences, endorsements and skills for shared artifacts connecting the profiles. This approach relies on bad actors using their accounts to backstop each other to increase the legitimacy and exhibiting defined TTPs. Through this analysis process I found 6 related profiles.

Here is an example of the endorsements between profiles:

![](/media/medium/cf3da7e27742259c.jpg)

GAN profiles recommending each other

Among the original suspect profile and 6 additional profiles, the most notable attribute is they were all using GAN profile pictures such as those below:

![](/media/medium/2d8f8a7d092d72c5.jpg)

GAN generated profile photo

The experience listed for the profiles all fit a common pattern that includes 3 employers in the electronics, tech and telecommunications industries. The 3 positions would be incrementally increasing in responsibility and for different durations per profile. Each profile attended a major US college or university with a relevant degree and matching timeline. Here is an example history:

![](/media/medium/3f4b96c70fa50948.jpg)

Experience section from a GAN profile

One of the mistakes in the profiles was the location associated with the roles. For example, one profile claims to work at Samsung in Springfield, MA. All of the profiles contained similar mismatches.

![](/media/medium/9fd81754a036e93d.jpg)

Another interesting note is the profiles all post a news article to their feed every day. These articles are from major news sources such as BBC, NYTimes and The Verge and are general interest stories. The notable aspect of this is the regularity, they are posted one article per day at the same time of day.

Reviewing the groups that the profiles joined offers a potential clue about the origin of these accounts. Despite being listed as HR, recruiting and similar roles, the profiles all joined 10 LinkedIn groups that include “Machine Learning Community”, “Python Developers Community”, “Java Developers Community”, and most importantly “Test Automation”. The significance of this last group is that it is about topics related to device and browser automation for testing apps and sites. These techniques are often used to scale and automate actions on sites like LinkedIn, allowing actors to more efficiently create and manage fake profiles. It is possible that this list of groups to join was somehow left in by mistake, providing a clue that these profiles were created using tools to automate their actions, which is consistent with observed behaviors.

### LI Profile TTPs

#### Profile creation:

-   List a major US university, graduation year 2007–2012
-   2 languages listed — English and one other (mostly Spanish)
-   GAN generated profile photo
-   Exactly 3 jobs, generally incrementally advancing at major companies
-   Companies and job roles don’t match known company locations, for example one profile lists Adobe in Springfield, MA
-   Joined Linkedin groups that include Test Automation, python, java that don’t fit the profiles

#### Profile actions:

-   Profiles endorse each others skills, sometimes connected
-   Daily posting of one general interest news article
-   Unsolicited connection attempts to targeted real world communities

#### Evasion:

-   GAN photos appear to be selected or generated from latent space vectors that:
-   maximize neutral background, i.e. no text or scenery
-   remove non-business elements like hats
-   are female
-   One GAN photo uses rotation and cropping to move the center of the face
