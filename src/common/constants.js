export const productRegisterFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    xs: 12,
  },
  {
    name: "phoneNumber",
    label: "Number",
    type: "text",
    xs: 12,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    xs: 12,
  },
  {
    name: "payment",
    label: "Payment",
    type: "enum",
    xs: 12,
  },
  {
    name: "isProductReady",
    label: "Is Product Ready?",
    type: "enum",
    xs: 12,
  },
  {
    name: "note",
    label: "Note",
    type: "text",
    xs: 12,
  },
  {
    name: "isCouriered",
    label: "Is Couriered?",
    type: "enum",
    xs: 12,
  },
  {
    name: "isProductReceivedByCustomer",
    label: "Received?",
    type: "enum",
    xs: 12,
  },
];

export const allClasses = [
  "Nursery",
  "L.K.G",
  "U.K.G",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

export const studentsField = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },

  {
    name: "rollNo",
    label: "Roll No",
    type: "text",
  },
  {
    name: "class",
    label: "Class",
    type: "enum",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },

  {
    name: "address",
    label: "Address",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
  },
];

export const noticeField = [
  {
    name: "description",
    label: "Description",
    type: "text",
  },
];
export const attendanceField = [
  {
    name: "name",
    label: "Student Name",
    type: "text",
  },

  {
    name: "isPresent",
    label: "Absent/Present",
    type: "boolean",
  },
];

export const teacherField = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
  },
];

export const users = [
  {
    _id: 12,
    name: "Samrat Ojha",
    phoneNumber: 9800976626,
    address: "Kathmandu,putalisadak",
    note: "asd",
    payment: "Yes",
    isProductReady: "Yes",
    isCouriered: "Yes",
    isProductReceivedByCustomer: "No",
  },
  {
    _id: 122,
    name: "Neha Koirala",
    phoneNumber: 9832426626,
    address: "Pokhara,lekhnath chowk",
    note: "asd",
    payment: "Half",
    isProductReady: "Yes",
    isCouriered: "Yes",
    isProductReceivedByCustomer: "No",
  },
];

export const addOrUpdateItemInArray = (array, object, pk = "_id") => {
  const indexInArray = array.findIndex((item) => item[pk] === object[pk]);
  if (indexInArray === -1) {
    array.unshift(object);
    return array;
  }
  array[indexInArray] = object;
  return array;
};
