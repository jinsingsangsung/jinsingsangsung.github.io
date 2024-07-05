---
title: 'Home'
date: 2023-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:
  - block: resume-biography-3
    content:
      username: admin
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: IMG_9807.jpg
          filters:
            brightness: 0.3
          size: cover
          position: center
          parallax: false        
    # design:
    #   banner:
    #     # Upload your cover image to the `assets/media/` folder and reference it here
    #     filename: IMG_9807.jpg
    #   biography:
    #     # Customize the style of your biography text
    #     style: 'text-align: justify; font-size: 0.8em;'
    #   columns: '2'
  - block: collection
    id: news
    content:
      title: Recent News
      subtitle: ''
      text: "
      - (Jul. 2024) A paper is accepted to ECCV 2024.
      - (Jan. 2023) I started working at NAVER Clova as a research scientist intern.
      - (Feb. 2022) A paper is accepted to CVPR 2022.
      - (Jan. 2022) I will be visiting Carnegie Mellon University as a visiting scholar.
      "
      # Page type to display. E.g. post, talk, publication...
      page_type: talk
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: compact
      columns: '2'    

  - block: collection_custom
    content:
      title: Publications
      text: ""
      filters:
        folders:
          - publication    
        tag: ""
        category: ""
        publication_type: ""
        author: ""
        exclude_featured: false
    design:
      view: community/citation
      css_class: custom-block

  - block: experience
    content:
      username: admin
    design:
      # Hugo date format
      date_format: 'January 2006'
      # Education or Experience section first?
      # is_education_first: True
      columns: '2' 

  # - block: skills
  #   content:
  #     title: Skills & Hobbies
  #     username: admin
  # - block: awards
  #   content:
  #     title: Awards
  #     username: admin
  # - block: publications
  #   content:
  #     title: Publications
  #     username: admin  
  # - block: languages
  #   content:
  #     title: Languages
  #     username: admin
---
