// /* eslint-disable max-len */
// import React, { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
// import { Button, Container, Form, Spinner } from "react-bootstrap";
// import userData from "../data/userData";
// import wallet from "../helpers/wallet";
// import detectEthereumProvider from "@metamask/detect-provider";
// import { ethers } from "ethers";
// import Web3 from "web3";

// import akkoTokenAbi from "../helpers/akkoTokenAbi";
// import akkoPresaleAbi from "../helpers/akkoPresaleAbi";

// import akvTokenAbi from "../helpers/akvTokenAbi";
// import akvTokenPresaleAbi from "../helpers/akvTokenPresaleAbi";

// import Swal from "sweetalert2";

// function Profile({ ...props }) {
//   var index = localStorage.getItem("index");

//   const akvBalance_ = localStorage.getItem("akvBalance");
//   const akkBalance_ = localStorage.getItem("akkBalance");

//   const storageAKK = localStorage.getItem("userNewAKK1");
//   const [TokenInputValue, setUnoTokenInputValue] = useState({
//     etherValue: 1,
//   });
//   const [isLoading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);
//   const [functionName, setFunctionName] = useState("");
//   const [akvAmount, setAkvAmount] = useState(akvBalance_);
//   const [akkAmount, setAkkAmount] = useState(akkBalance_);
//   const [loyaltyAmount, setLoyaltyAmount] = useState(storageAKK);

//   const akkoTokenAddress = "0xDfFfc72Ad90E834A409C863fC125c802B55407a7";
//   const akkoPresaleContractAddress =
//     "0xc08A332b7F9826cF7761e739F984d389778e1493";
//   const akvTokenAddress = "0xe08d3B36A4200F5a4201aB0610725d7e5F3f1Fd0";
//   const akvPresaleContractAddress =
//     "0xe41C10b08F846a2E91e9bd9Fa6F5bA6973Fd5b7b";

//   const OnChangeHandler = (event) => {
//     const { value } = event.target;
//     console.log(":",value)
//     if(value === ""){
//       localStorage.setItem("etherValue",0)
//     }else{
//       localStorage.setItem("etherValue", value);
//     }
    
//   };
//   function formatAKKBalance() {
//     const formatBalance = (Number(akkAmount) / 10000).toFixed(4).split(".");
//     const firstValueFormatBalance = Number(formatBalance[0]).toLocaleString(
//       "tr-TR"
//     );
//     console.log(firstValueFormatBalance, formatBalance);
//     return firstValueFormatBalance + "," + formatBalance[1];
//   }
//   function formatAKVBalance() {
//     const formatBalance = (Number(akvAmount) / 10000).toFixed(4).split(".");
//     const firstValueFormatBalance = Number(formatBalance[0]).toLocaleString(
//       "tr-TR"
//     );
//     console.log(firstValueFormatBalance, formatBalance);
//     return firstValueFormatBalance + "," + formatBalance[1];
//   }
//   console.log(functionName);
//   const buyHandler = () => {
//     if (functionName === "buyAKVToken") {
//       buyAKVToken();
//     } else if (functionName === "sellAKKToken") {
//       sellAKKToken();
//     } else if (functionName === "swapAKVToken") {
//       swapAKVToken();
//     }
//   };

//   const reset = () => {
//     console.log("reset");
//     localStorage.setItem("userNewAKK1", userData[index].akk);
//     localStorage.setItem("totalAKK", userData[index].akk);

//     window.location.reload();
//   };
//   const addAKKTokenFunction = async () => {
//     try {
//       const provider = await detectEthereumProvider();
//       const wasAdded = await provider.sendAsync({
//         method: "wallet_watchAsset",
//         params: {
//           type: "ERC20",
//           options: {
//             address: "0xDfFfc72Ad90E834A409C863fC125c802B55407a7",
//             symbol: "AKK",
//             decimals: 4,
//           },
//         },
//       });

//       if (wasAdded) {
//         console.log("Thanks for your interest!");
//       } else {
//         console.log("UnoToken has not been added");
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };
//   const addAKVTokenFunction = async () => {
//     try {
//       const provider = await detectEthereumProvider();
//       const wasAdded = await provider.sendAsync({
//         method: "wallet_watchAsset",
//         params: {
//           type: "ERC20",
//           options: {
//             address: "0xe08d3B36A4200F5a4201aB0610725d7e5F3f1Fd0",
//             symbol: "AKV",
//             decimals: 4,
//           },
//         },
//       });

//       if (wasAdded) {
//         console.log("Thanks for your interest!");
//       } else {
//         console.log("UnoToken has not been added");
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };

//   wallet.getMyBalance(akvTokenAddress, "akv");
//   wallet.getMyBalance(akkoTokenAddress, "akk");

//   useEffect(() => {
//     const totalAKVValue = localStorage.getItem("akvBalance");
//     if (Number(totalAKVValue) < 100) {
//       localStorage.setItem("level", 1);
//       localStorage.setItem("levelMultiply", 1);
//     } else if (Number(totalAKVValue) < 500 && Number(totalAKVValue) > 99) {
//       localStorage.setItem("level", 2);
//       localStorage.setItem("levelMultiply", 1.2);
//     } else if (Number(totalAKVValue) < 2500 && Number(totalAKVValue) > 499) {
//       localStorage.setItem("level", 3);
//       localStorage.setItem("levelMultiply", 1.4);
//     } else if (Number(totalAKVValue) < 10000 && Number(totalAKVValue) > 2499) {
//       localStorage.setItem("level", 4);
//       localStorage.setItem("levelMultiply", 1.6);
//     } else if (Number(totalAKVValue) > 9999) {
//       localStorage.setItem("level", 5);
//       localStorage.setItem("levelMultiply", 1.8);
//     }
//   }, [akvAmount]);

//   const user_level = localStorage.getItem("level");

//   const sellAKKToken = async (e) => {
//     e?.preventDefault();
//     // setTxs([]);

//     // const data = new FormData(e.target);
//     setLoading(true);
//     const provider = new ethers.providers.Web3Provider(window.ethereum);

//     const signer = await provider.getSigner();

//     const signerAddress = await signer.getAddress();
//     console.log(signerAddress);
//     const web3 = new Web3(window.ethereum);
//     await wallet.controlAndSwitchOrAddNetwork();
//     await window.ethereum.enable();
//     // const unopad_token = new web3.eth.Contract(akkoPresaleAbi, project?.token.address);
//     const akko_presale = new web3.eth.Contract(
//       akkoPresaleAbi,
//       akkoPresaleContractAddress
//     );
//     // const akko_token = new web3.eth.Contract(
//     //   akkoTokenAddress,
//     //   akkoTokenAbi,
//     // );
//     // const etherMiktari = data.get('etherValue');
//     const userBuyAKK = localStorage.getItem("userNewAKK1") * 10000;

//     console.log(userBuyAKK);
//     try {
//       const transaction = await akko_presale.methods.buy(userBuyAKK).send({
//         from: signerAddress,
//         to: akkoPresaleContractAddress,
//         data: web3.eth.abi.encodeFunctionSignature("whitdrawETH()"),
//       });
//       setLoading(false);
//       Swal.fire({
//         icon: "success",
//         iconColor: "#E4007D",
//         titleText: "İslem Basarili",
//         confirmButtonColor: "#E4007D",
//         html:
//           "<a href=https://testnet.bscscan.com/tx/" +
//           transaction.transactionHash +
//           " target='_blank'> Detaylar icin Tiklayiniz !</a>",
//       });
//       localStorage.setItem("userNewAKK1", userData[index].akk);
//       console.log("success");
//       wallet.getMyBalance(akkoTokenAddress, "akk").then((result) => {
//         setAkkAmount(result);
//       });
//       setLoyaltyAmount(localStorage.getItem("userNewAKK1"));
//       // setTimeout(() => {}, 5000);
//       // window.location.reload();
//     } catch (err) {
//       console.error(err);

//       if (err?.receipt?.transactionHash) {
//         Swal.fire({
//           icon: "error",
//           iconColor: "#E4007D",
//           titleText: "İslem Basarisiz",
//           confirmButtonColor: "#E4007D",
//           // eslint-disable-next-line max-len, no-template-curly-in-string
//           html:
//             "<a href=https://testnet.bscscan.com/tx/" +
//             err.receipt.transactionHash +
//             " target='_blank'> Detaylar icin Tiklayiniz !</a>",
//         });
//         setLoading(false);
//         console.log("loading");
//       } else {
//         console.log(err);
//         Swal.fire({
//           icon: "warning",
//           iconColor: "#E4007D",
//           confirmButtonColor: "#E4007D",
//           text: err.message,
//         });
//         setLoading(false);
//       }
//     }
//   };
//   const buyAKVToken = async (e) => {
//     e?.preventDefault();
//     // setTxs([]);

//     // const data = new FormData(e.target);
//     setLoading(true);
//     const provider = new ethers.providers.Web3Provider(window.ethereum);

//     const signer = await provider.getSigner();

//     const signerAddress = await signer.getAddress();
//     console.log(signerAddress);
//     const web3 = new Web3(window.ethereum);
//     await wallet.controlAndSwitchOrAddNetwork();
//     await window.ethereum.enable();
//     // const unopad_token = new web3.eth.Contract(akkoPresaleAbi, project?.token.address);
//     const akv_presale = new web3.eth.Contract(
//       akvTokenPresaleAbi,
//       akvPresaleContractAddress
//     );
//     // const akko_token = new web3.eth.Contract(
//     //   akkoTokenAddress,
//     //   akkoTokenAbi,
//     // );
//     // const etherMiktari = data.get('etherValue');

//     const amount = Number(localStorage.getItem("etherValue"));
//     if (amount > 1000 || amount === 0) {
//       Swal.fire({
//         icon: "error",
//         iconColor: "#E4007D",
//         titleText: "Girdiginiz deger 1 ve 1000 arasinda olmali",
//         confirmButtonColor: "#E4007D",
//         // eslint-disable-next-line max-len, no-template-curly-in-string
//       });
//       setLoading(false);
//     } else {
//       try {
//         const numberAmount = Number(amount * 10000);
//         const transaction = await akv_presale.methods.buy().send({
//           from: signerAddress,
//           to: akvPresaleContractAddress,
//           data: web3.eth.abi.encodeFunctionSignature("whitdrawETH()"),
//           value: web3.utils.toWei(web3.utils.toBN(numberAmount), "wei"),
//         });
//         setLoading(false);
//         Swal.fire({
//           icon: "success",
//           iconColor: "#E4007D",
//           titleText: "İslem Basarili",
//           confirmButtonColor: "#E4007D",
//           html:
//             "<a href=https://testnet.bscscan.com/tx/" +
//             transaction.transactionHash +
//             " target='_blank'> Detaylar icin Tiklayiniz !</a>",
//         });
//         wallet.getMyBalance(akvTokenAddress, "akv").then((result) => {
//           setAkvAmount(result);
//         });

//         // setAkvAmount(wallet.getMyBalance("0x9f69F2f7BccDdE9604eaE267AAC3F22a7828A621", "akv"))
//         console.log("success");
//         setOpenModal(false);
//         // setTimeout(() => {}, 5000);
//         // window.location.reload();
//       } catch (err) {
//         console.error(err);

//         if (err?.receipt?.transactionHash) {
//           Swal.fire({
//             icon: "error",
//             iconColor: "#E4007D",
//             titleText: "İslem Basarisiz",
//             confirmButtonColor: "#E4007D",
//             // eslint-disable-next-line max-len, no-template-curly-in-string
//             html:
//               "<a href=https://testnet.bscscan.com/tx/" +
//               err.receipt.transactionHash +
//               " target='_blank'> Detaylar icin Tiklayin!</a>",
//           });
//           setLoading(false);
//           setOpenModal(false);
//           console.log("loading");
//         } else {
//           console.log(err);
//           Swal.fire({
//             icon: "warning",
//             iconColor: "#E4007D",
//             confirmButtonColor: "#E4007D",
//             text: err.message,
//           });
//           setLoading(false);
//           setOpenModal(false);
//         }
//       }
//     }
//   };

//   const swapAKVToken = async (e) => {
//     e?.preventDefault();
//     // setTxs([]);

//     // const data = new FormData(e.target);
//     setLoading(true);
//     const provider = new ethers.providers.Web3Provider(window.ethereum);

//     const signer = await provider.getSigner();

//     const signerAddress = await signer.getAddress();
//     console.log(signerAddress);
//     const web3 = new Web3(window.ethereum);
//     await wallet.controlAndSwitchOrAddNetwork();
//     await window.ethereum.enable();
//     // const unopad_token = new web3.eth.Contract(akkoPresaleAbi, project?.token.address);
//     const akko_token = new web3.eth.Contract(akkoTokenAbi, akkoTokenAddress);
//     const akv_presale = new web3.eth.Contract(
//       akvTokenPresaleAbi,
//       akvPresaleContractAddress
//     );

//     // const etherMiktari = data.get('etherValue');

//     const amount = Number(localStorage.getItem("etherValue"));
//     if (amount > 1000 || amount === 0) {
//       console.log("asdasfasf")
//       Swal.fire({
//         icon: "error",
//         iconColor: "#E4007D",
//         titleText: "Girdiginiz deger 1 ve 1000 arasinda olmali",
//         confirmButtonColor: "#E4007D",
//         // eslint-disable-next-line max-len, no-template-curly-in-string
//       });
//       setLoading(false);
//     } else {
//       try {
//         const numberAmount = Number(amount * 10000);
//         const approve_transaction = await akko_token.methods
//           .approve(akvPresaleContractAddress, numberAmount)
//           .send({
//             from: signerAddress,
//             to: akvPresaleContractAddress,
//             data: web3.eth.abi.encodeFunctionSignature("whitdrawETH()"),
//           }); // sell methodu için gerekli fonksiyon // token abiden çagrılcak
//         const transaction = await akv_presale.methods.swap(numberAmount).send({
//           from: signerAddress,
//           to: akvPresaleContractAddress,
//           data: web3.eth.abi.encodeFunctionSignature("whitdrawETH()"),
//         });

//         Swal.fire({
//           icon: "success",
//           iconColor: "#E4007D",
//           titleText: "İslem Basarili",
//           confirmButtonColor: "#E4007D",
//           html:
//             "<a href=https://testnet.bscscan.com/tx/" +
//             transaction.transactionHash +
//             " target='_blank'> Detaylar icin Tiklayin !</a>",
//         });
//         setLoading(false);
//         wallet.getMyBalance(akvTokenAddress, "akv").then((result) => {
//           setAkvAmount(result);
//         });
//         wallet.getMyBalance(akkoTokenAddress, "akk").then((result) => {
//           setAkkAmount(result);
//         });
//         console.log("success");
//         setOpenModal(false);
//         // setTimeout(() => {}, 5000);
//         // window.location.reload();
//       } catch (err) {
//         console.error(err);

//         if (err?.receipt?.transactionHash) {
//           Swal.fire({
//             icon: "error",
//             iconColor: "#E4007D",
//             titleText: "İslem Basarisiz",
//             confirmButtonColor: "#E4007D",
//             // eslint-disable-next-line max-len, no-template-curly-in-string
//             html:
//               "<a href=https://testnet.bscscan.com/tx/" +
//               err.receipt.transactionHash +
//               " target='_blank'> Detaylar icin Tiklayin!</a>",
//           });
//           setLoading(false);
//           setOpenModal(false);
//           console.log("loading");
//         } else {
//           console.log(err);
//           Swal.fire({
//             icon: "warning",
//             iconColor: "#E4007D",
//             confirmButtonColor: "#E4007D",
//             text: err.message,
//           });
//           setLoading(false);
//           setOpenModal(false);
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <Container className="px-6">
//         <Table striped bordered hover className="">
//           <thead>
//             <tr>
//               <th>Token Name</th>
//               <th>Wallet Amount</th>
//               <th>Loyalty Amount</th>
//               <th>Level</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {userData[index].username === localStorage.getItem("user") ? (
//                 <>
//                   <td>AKK</td>
//                   <td>{formatAKKBalance()}</td>
//                   <td>{loyaltyAmount}</td>
//                   <td>{user_level}</td>
//                 </>
//               ) : (
//                 <></>
//               )}
//               <td>
//                 <Button
//                   onClick={() => {
//                     wallet.connectWallet();
//                     setOpenModal(false);
//                     sellAKKToken();
//                   }}
//                   disabled={
//                     isLoading || Number(loyaltyAmount) <= 0 ? true : false
//                   }
//                   style={{ width: "100%", display: "block" }}
//                 >
//                   {isLoading ? (
//                     <div className="d-flex align-items-center justify-content-center">
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden"></span>
//                       </Spinner>
//                     </div>
//                   ) : (
//                     "Send Metamask"
//                   )}
//                 </Button>
//               </td>
//               <td>
//                 <Button
//                   onClick={reset}
//                   disabled={isLoading}
//                   style={{ width: "100%", display: "block" }}
//                 >
//                   {isLoading ? (
//                     <div className="d-flex align-items-center justify-content-center">
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden"></span>
//                       </Spinner>
//                     </div>
//                   ) : (
//                     "Reset"
//                   )}
//                 </Button>
//               </td>
//               <td>
//                 <Button
//                   onClick={addAKKTokenFunction}
//                   disabled={isLoading}
//                   style={{ width: "100%", display: "block" }}
//                 >
//                   {isLoading ? (
//                     <div className="d-flex align-items-center justify-content-center">
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden"></span>
//                       </Spinner>
//                     </div>
//                   ) : (
//                     "Add AKK"
//                   )}
//                 </Button>
//               </td>
//             </tr>
//           </tbody>
//           <tbody>
//             <tr>
//               {userData[index].username === localStorage.getItem("user") ? (
//                 <>
//                   <td>AKV</td>
//                   <td>{formatAKVBalance()}</td>
//                   <td>-</td>
//                   <td>{user_level}</td>
//                 </>
//               ) : (
//                 <></>
//               )}
//               <td>
//                 <Button
//                   onClick={() => {
//                     wallet.connectWallet();
//                     setOpenModal(true);
//                     setFunctionName("buyAKVToken");
//                     localStorage.setItem("etherValue", 0);
//                   }}
//                   disabled={isLoading}
//                   style={{ width: "100%", display: "block" }}
//                 >
//                   {isLoading ? (
//                     <div className="d-flex align-items-center justify-content-center">
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden"></span>
//                       </Spinner>
//                     </div>
//                   ) : (
//                     "Buy AKV"
//                   )}
//                 </Button>
//               </td>

//               <td>
//                 <Button
//                   onClick={() => {
//                     wallet.connectWallet();
//                     setOpenModal(true);
//                     setFunctionName("swapAKVToken");
//                     localStorage.setItem("etherValue", 0);
//                   }}
//                   disabled={isLoading}
//                   style={{ width: "100%", display: "block" }}
//                 >
//                   {isLoading ? (
//                     <div className="d-flex align-items-center justify-content-center">
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden"></span>
//                       </Spinner>
//                     </div>
//                   ) : (
//                     "Swap AKV/AKK"
//                   )}
//                 </Button>
//               </td>
//               <td>
//                 <Button
//                   onClick={addAKVTokenFunction}
//                   disabled={isLoading}
//                   style={{ width: "100%", display: "block" }}
//                 >
//                   {isLoading ? (
//                     <div className="d-flex align-items-center justify-content-center">
//                       <Spinner animation="border" role="status">
//                         <span className="visually-hidden"></span>
//                       </Spinner>
//                     </div>
//                   ) : (
//                     "Add AKV"
//                   )}
//                 </Button>
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//         <Table striped bordered hover className=""></Table>
//       </Container>
//       {openModal ? (
//         <form className="mx-5">
//           <div
//             className="credit-card w-full lg:w-3/4 sm:w-auto 
//           shadow-lg mx-auto rounded-xl"
//           >
//             <main className="px-4">
//               <p className="d-flex justify-content-center text-fs-head-md">
//                 Token Amount
//               </p>{" "}
//               <div className="mx-3">
//                 <div className="my-3">
//                   <Form.Control
//                     type="number"
//                     name="etherValue"
//                     className="input input-bordered text-fs-body-md text-t-body-color bg-light"
//                     placeholder="Ether Value"
//                     min="1"
//                     step="1"
//                     max="1000"
//                     value={TokenInputValue.InputValue}
//                     onChange={OnChangeHandler}
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>
//             </main>
//             <footer className="d-flex justify-content-center p-2">
//               <Button
//                 className="btn btn-primary d-flex justify-content-center"
//                 disabled={isLoading}
//                 onClick={buyHandler}
//               >
//                 {" "}
//                 {!isLoading ? (
//                   "BuyToken"
//                 ) : (
//                   <div className="d-flex align-items-center justify-content-center">
//                     <Spinner animation="border" role="status">
//                       <span className="visually-hidden"></span>
//                     </Spinner>
//                     <span className="ml-2">İslem Gerceklesiyor...</span>
//                   </div>
//                 )}
//               </Button>
//             </footer>
//           </div>
//         </form>
//       ) : (
//         <div></div>
//       )}
//     </>
//   );
// }

// export default Profile;
