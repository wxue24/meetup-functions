let db = {
  users: [
    {
      userId: "dh23ggj5h32g543j5gf43",
      email: "user@email.com",
      handle: "user",
      firstName: "Tim",
      lastName: "Jones",
      school: "Claremont High",
      grade: 11,
      phone: "909-965-9654",
      createdAt: "2019-03-15T10:59:52.798Z",
      location: {
        address: "112 Indian Hill Blvd",
        city: "Claremont",
        state: "CA",
        zip: "91711",
      },
      interests: {
        sports: ["soccer", "basketball"],
        art: ["painting", "photography"],
        music: ["guitar", "piano"],
        nature: ["astronomy", "bird-watching"],
        other: ["cooking", "board games"],
      },
      socialMediaHandles: {
        instagram: "user123",
        snapchat: "user234",
      },
      friends: [
        {
          name: "john",
          handle: "john123",
          sharedInterests: ["soccer", "cooking"],
          grade: 11,
          school: "Claremont High",
          socialMedia: {
            instagram: "john123",
          },
        },
      ],
      friendRequests: [
        {
          sender: "john",
          sharedInterests: ["soccer", "cooking"],
          grade: 11,
          school: "Claremont High",
          socialMedia: {
            instagram: "john123",
          },
        },
      ],
      filterSettings: {
        gradeAboveMax: "1",
        gradeBelowMax: "1",
        sameSchool: "Yes | Any | No",
        radius: "2", // 1,2,3,4,5+
        sharedInterest: "soccer", //specific interest or any
      },
    },
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ],
};

const userDetails = {
  // Redux data
  credentials: {
    userId: "dh23ggj5h32g543j5gf43",
    email: "user@email.com",
    handle: "user",
    firstName: "Tim",
    lastName: "Jones",
    school: "Claremont High",
    grade: 11,
    phone: "909-965-9654",
    createdAt: "2019-03-15T10:59:52.798Z",
    location: {
      address: "112 Indian Hill Blvd",
      city: "Claremont",
      state: "CA",
      zip: "91711",
    },
  },
  interests: {
    sports: ["soccer", "basketball"],
    art: ["painting", "photography"],
    music: ["guitar", "piano"],
    nature: ["astronomy", "bird-watching"],
    other: ["cooking", "board games"],
  },
  socialMediaHandles: {
    instagram: "user123",
    snapchat: "user234",
  },
  friends: [
    {
      name: "john",
      handle: "john123",
      sharedInterests: ["soccer", "cooking"],
      grade: 11,
      school: "Claremont High",
      socialMedia: {
        instagram: "john123",
      },
    },
  ],
  friendRequests: [
    {
      sender: "john",
      sharedInterests: ["soccer", "cooking"],
      grade: 11,
      school: "Claremont High",
      socialMedia: {
        instagram: "john123",
      },
    },
  ],
  filterSettings: {
    gradeAboveMax: "1",
    gradeBelowMax: "1",
    sameSchool: "Yes | Any | No",
    radius: "2", // 1,2,3,4,5+
    sharedInterest: "soccer", //specific interest or any
  },
};
