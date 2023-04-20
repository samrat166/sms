// import { AccountCircleSharp, Face3 } from "@mui/icons-material";
// import React, { useEffect, useState } from "react";
// import { Button, Col, Form, Modal, Row } from "react-bootstrap";
// import { productRegisterFormFields } from "../../common/constants";
// import DeleteModal from "./DeleteModal";

// const AddCustomer = ({
//   show,
//   handleClose,
//   handleCreateCustomer,
//   handleEdit,
//   handelDeleteCustomer,
// }) => {
//   const [customerDetail, setCustomerDetail] = useState({});
//   const [openDeleteModal, setOpenDeleteModal] = useState(false);
//   const handleSaveChanges = () => {
//     if (!customerDetail.name) return alert("Please Enter Customer's Name");
//     if (!customerDetail.address)
//       return alert("Please Enter Customer's Address");
//     if (!customerDetail.phoneNumber)
//       return alert("Please Enter Customer's Phone Number");
//     if (
//       !customerDetail.note &&
//       (customerDetail.isProductReady === "No" || !customerDetail.isProductReady)
//     )
//       return alert("Please provide reason why the product is not ready");
//     if (!customerDetail._id) {
//       handleCreateCustomer(customerDetail);
//     } else {
//       handleEdit(customerDetail);
//     }
//     handleClose();
//   };

//   const handleCustomerDelete = () => {
//     handelDeleteCustomer(customerDetail);
//     handleClose();
//   };
//   useEffect(() => {
//     setCustomerDetail(show);
//   }, [show]);

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton className="py-1">
//         <Modal.Title>
//           {show?.name ? (
//             <>
//               <AccountCircleSharp />{" "}
//               <span style={{ fontSize: 18 }}> {show?.name.toUpperCase()}</span>
//             </>
//           ) : (
//             "Add New Customer"
//           )}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="py-1">
//         <Row>
//           {productRegisterFormFields.map((field, index) => {
//             return (
//               <Col xs={field.xs} className={index !== 0 && "mt-2"}>
//                 <h6 className="small mb-1 text-muted">{field.label}:</h6>
//                 {field.type === "enum" && (
//                   <select
//                     className="form-control form-control-sm w-100"
//                     value={customerDetail?.[field.name] ?? "No"}
//                     onChange={(e) =>
//                       setCustomerDetail({
//                         ...customerDetail,
//                         [field.name]: e.target.value,
//                       })
//                     }
//                   >
//                     {" "}
//                     <option value="Yes">Yes</option>{" "}
//                     <option value="No">No</option>
//                     {field.name === "payment" && (
//                       <option value="Half">Half</option>
//                     )}
//                   </select>
//                 )}
//                 {field.type === "text" && (
//                   <input
//                     placeholder=""
//                     required=""
//                     rows="4"
//                     type="text"
//                     value={customerDetail?.[field.name]}
//                     onChange={(e) =>
//                       setCustomerDetail({
//                         ...customerDetail,
//                         [field.name]: e.target.value,
//                       })
//                     }
//                     className="form-control form-control-sm"
//                   ></input>
//                 )}
//               </Col>
//             );
//           })}
//         </Row>
//       </Modal.Body>
//       <Modal.Footer>
//         {show?._id && (
//           <Button variant="danger" onClick={() => setOpenDeleteModal(true)}>
//             Delete
//           </Button>
//         )}
//         <Button variant="success" onClick={handleSaveChanges}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//       <DeleteModal
//         openDeleteModal={openDeleteModal}
//         onHide={() => setOpenDeleteModal(false)}
//         onDelete={handleCustomerDelete}
//         name={show?.name}
//       />
//     </Modal>
//   );
// };

// export default AddCustomer;
