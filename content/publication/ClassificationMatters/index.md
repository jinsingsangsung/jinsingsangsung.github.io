---
title: 'Classification Matters: Improving Video Action Detection with Class-Specific Attention'

# Authors
# If you created a profile for a user (e.g. the default `admin` user), write the username (folder name) here
# and it will be replaced with their full name and linked to their profile.
authors:
  - admin
  - Taeoh Kim
  - Inwoong Lee
  - Minho Shim
  - Dongyoon Wee
  - Minsu Cho
  - Suha Kwak

# Author notes (optional)
# author_notes:
#   - 'Equal contribution'
#   - 'Equal contribution'

date: '2024-07-01T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2024-07-05T00:00:00Z'

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ['paper-conference']

# Publication name and optional abbreviated publication name.
publication: In *European Conference of Computer Vision* 2024 *<span style="color:#ff4785">(oral)*
publication_short: In *ECCV 2024 <span style="color:#ff4785">(oral)*

abstract: Video action detection (VAD) aims to detect actors and classify their actions in a video. We figure that VAD suffers more from classification rather than localization of actors. Hence, we analyze how prevailing methods form features for classification and find that they prioritize actor regions for classification, yet often overlooking the essential contextual information necessary for accurate classification. Accordingly, we propose to reduce the model's bias toward the actor itself and encourage it to pay attention to the context that is relevant to each action class. By assigning a class-dedicated query to each action class, the model can dynamically determine where to focus for effective classification. The proposed method demonstrates superior performance on three challenging benchmarks while using significantly fewer parameters and less computation.

# Summary. An optional shortened abstract.
summary: Video Action Detection

tags:
  - Video Action Detection

# Display this page in the Featured widget?
featured: true
img: content/publication/ClassificationMatters/featured.png

# Custom links (uncomment lines below)
links:
- name: Project Page
  url: https://jinsingsangsung.github.io/ClassificationMatters/

url_pdf: https://arxiv.org/pdf/2407.19698v3
url_code: ''
url_dataset: ''
url_poster: ''
url_project: https://jinsingsangsung.github.io/ClassificationMatters/
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'The highlighted regions are where the model attended to classify each action class'
  focal_point: ''
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
  - example

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: example
---







<!-- {{% callout note %}}
Click the _Cite_ button to import publication metadata into your reference management software.
{{% /callout %}} -->

<!-- {{% callout note %}}
Create your slides in Markdown - click the _Slides_ button to check out the example.
{{% /callout %}} -->

<!-- Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
