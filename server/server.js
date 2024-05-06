import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import requestIp from "request-ip";
import getNearbyCafes from "./NearbyCafes.js";
import multer from "multer";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { uid } from "uid";
import pg from "pg";
import RegisterStore from "./MyServerFunctions/StoreRegistration/RegisterStore.js";
import bcrypt from "bcrypt";
import RegisterVendor from "./MyServerFunctions/StoreRegistration/RegisterVendor.js";
import InsertStoreInfo from "./MyServerFunctions/StoreRegistration/InsertStoreInfo.js";
import InsertStoreOperation from "./MyServerFunctions/StoreRegistration/InsertStoreOperation.js";
import dayjs from "dayjs";
import _ from "lodash";
import GetStoreInfo from "./MyServerFunctions/Admin/GetStoreInfo.js";
import GetStoreOperation from "./MyServerFunctions/Admin/GetStoreOperation.js";
import GetLogin from "./MyServerFunctions/Login/GetLogin.js";
import GetUser from "./MyServerFunctions/Admin/GetUser.js";
import GetUserEmail from "./MyServerFunctions/StoreRegistration/GetUserEmail.js";
import GetStoreName from "./MyServerFunctions/StoreRegistration/GetStoreName.js";
import PadZeroes from "./MyServerFunctions/PadZeroes.js";
import getVendorCount from "./MyServerFunctions/StoreRegistration/getVendorCount.js";
import inserCustomer from "./MyServerFunctions/Customer/inserCustomer.js";
import getUserRole from "./MyServerFunctions/Admin/getUserRole.js";
import AdminViewUserInfo from "./MyServerFunctions/Admin/AdminViewUserInfo.js";
import AdminViewCustomerInfo from "./MyServerFunctions/Admin/AdminViewCustomerInfo.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import getVendor from "./MyServerFunctions/Vendor/getVendor.js";
import ApproveApplication from "./MyServerFunctions/Admin/ApproveApplication.js";
import addStoreProduct from "./MyServerFunctions/Vendor/addStoreProduct.js";
import checkExistingProduct from "./MyServerFunctions/Vendor/checkExistingProduct.js";
import countCategoryProduct from "./MyServerFunctions/Vendor/countCategoryProduct.js";
import generateAcronym from "./MyServerFunctions/generateAcronym.js";
import getStoreProducts from "./MyServerFunctions/Vendor/getStoreProducts.js";
import countAddOns from "./MyServerFunctions/Vendor/countAddOns.js";
import addStoreAddOns from "./MyServerFunctions/Vendor/addStoreAddOns.js";
import checkExistingAddOns from "./MyServerFunctions/Vendor/checkExistingAddons.js";
import getStoreAddOns from "./MyServerFunctions/Vendor/getStoreAddOns.js";
import getAvailableProducts from "./MyServerFunctions/Customer/getAvailableProducts.js";
import GetStoreEmail from "./MyServerFunctions/StoreRegistration/GetStoreEmail.js";
import fs from "fs";
import DeactivateUser from "./MyServerFunctions/Admin/DeactivateUser.js";
import RejectApplication from "./MyServerFunctions/Admin/RejectApplication.js";
import checkExistingProductUpdate from "./MyServerFunctions/Vendor/checkExistingProductUpdate.js";
import updateProdNoImg from "./MyServerFunctions/Vendor/updateProdNoImg.js";
import updateProdWImg from "./MyServerFunctions/Vendor/updateProdWImg.js";
import orderCount from "./MyServerFunctions/orderCount.js";
import insertOrder from "./MyServerFunctions/Vendor/insertOrder.js";
import fetchOrders from "./MyServerFunctions/Vendor/fetchOrders.js";
import InsertOnlineOrder from "./MyServerFunctions/Customer/InsertOnlineOrder.js";
import fetchUserOrder from "./MyServerFunctions/Customer/fetchUserOrder.js";
import fetchUserData from "./MyServerFunctions/Customer/fetchUserData.js";
import verifyEmailUpdate from "./MyServerFunctions/verifyEmailUpdate.js";
import verifyUserProfileExist from "./MyServerFunctions/Customer/verifyUserProfileExist.js";
import updateUserProfile from "./MyServerFunctions/Customer/updateUserProfile.js";
import insertUserProfile from "./MyServerFunctions/Customer/insertUserProfile.js";
import updateUserEmail from "./MyServerFunctions/updateUserEmail.js";
import pool from "./database.js";
const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000
app.use(
  cors({
    credentials: true,
    origin: ["https://smarfee-client.vercel.app"],
  })
);
app.use(cookieParser());
app.use(express.json());

const storeCredentials = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storeCredentials");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const storeProductStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storeProducts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const vendorImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/vendorImg");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const addOnsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storeAddons");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const io = new Server(server, {
  cors: {
    origin: "https://smarfee-client.vercel.app",
    methods: ["GET", "POST"],
  },
});
const productImage = multer({ storage: storeProductStorage });
const vendorImage = multer({ storage: vendorImageStorage });
const uploadStoreCreds = multer({ storage: storeCredentials });
const addOnsImage = multer({ storage: addOnsStorage });
app.use(express.static("public"));

// const db = new pg.Client({
//   user: process.env.POSTGRES_USER,
//   host:  process.env.POSTGRES_HOST,
//   database:  process.env.PG_DB,
//   password:  process.env.PG_PW,
//   port:  process.env.PG_PORT,
// });
// db.connect();

const db = pool;

const saltRounds = 16;

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/api", async (req, res) => {
  // const lat = 14.6999457;
  // const long = 121.0336896;
  const lat = 14.6909575;
  const long = 121.0890238;
  const apiKey = process.env.MAP_API_KEY;
  const nearbyCafes = await getNearbyCafes(lat, long, 500, "cafe", apiKey);
  res.json({ nearbyCafe: nearbyCafes });
});

app.get("/user-info/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user_order = await fetchUserOrder(db, uid);
    const userData = await fetchUserData(db, uid);

    return res.json({ user_order: user_order, user_data: userData });
  } catch (error) {
    console.error("/user-info error: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = { name: email };

    const loginCred = await GetLogin(db, req.body.email);

    if (loginCred.length > 0) {
      const match = await bcrypt.compare(password, loginCred[0].password);
      if (match) {
        const userInfo = loginCred[0];

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return res.json({
          status: "success",
          accessToken: accessToken,
          uid: userInfo.id,
          role: userInfo.role,
          accStatus: userInfo.status,
        });
      }
    }

    return res.json({
      status: "invalid",
      errmessage: "Invalid email/password",
    });
  } catch (error) {
    console.error("login error: " + error.message);
    return res.json({ status: "error", errmessage: error.message });
  }
});

app.post("/place-order", async (req, res) => {});
app.get("/display-product", async (req, res) => {
  try {
    const availableProducts = await getAvailableProducts(db);
    res.json({ products: availableProducts });
  } catch (error) {
    console.error("display product error: " + error.message);
  }
});

app.post("/deactivate-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const deactivated = await DeactivateUser(db, userId);
    if (deactivated) {
      return res.json({ status: "success" });
    }

    return res.json({ status: "failed" });
  } catch (error) {
    console.error("Deactivatin error: " + error.message);
  }
});

app.post("/validate-store-registration", async (req, res) => {
  try {
    const checkExistingEmail = await GetUserEmail(db, req.body.vendorEmail);
    const checkStoreExistingEmail = await GetUserEmail(db, req.body.email);
    const checkStoresExistingEmail = await GetStoreEmail(db, req.body.email);
    const checkStoreExistingName = await GetStoreName(db, req.body.storeName);

    if (
      checkExistingEmail.rowCount === 0 &&
      checkStoreExistingEmail.rowCount === 0 &&
      checkStoreExistingName.rowCount === 0
    ) {
      return res.json({ status: "success" });
    } else {
      let errors = {
        storeName: "",
        email: "",
        vendorEmail: "",
      };

      console.log("checkStoreExistingName " + checkStoreExistingName.rowCount);
      console.log(
        "checkStoreExistingEmail " + checkStoreExistingEmail.rowCount
      );
      console.log("checkExistingEmail " + checkExistingEmail.rowCount);
      if (checkStoreExistingName.rowCount > 0) {
        errors.storeName = "Store name already exist!";
      }

      if (
        checkStoreExistingEmail.rowCount > 0 ||
        checkStoresExistingEmail.rowCount > 0
      ) {
        errors.email = "Store email already exist!";
      }

      if (checkExistingEmail.rowCount > 0) {
        errors.vendorEmail = "User email already exist!";
      }
      return res.json({ status: "invalid", error: errors });
    }
  } catch (error) {
    console.log("validate errpr: " + error.message);
  }
});
app.post(
  "/store-registration",
  uploadStoreCreds.fields([
    { name: "storeImg", maxCount: 1 },
    { name: "dti", maxCount: 1 },
    { name: "permit", maxCount: 1 },
    { name: "clearance", maxCount: 1 },
    { name: "validid", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userid = uid(16);

      const imageFile = req.files["storeImg"][0];
      const pdfDti = req.files["dti"][0];
      const pdfPermit = req.files["permit"][0];
      const pdfClearance = req.files["clearance"][0];
      const validId = req.files["validid"][0];

      const base64Data = req.body.vendorImg.replace(
        /^data:image\/jpeg;base64,/,
        ""
      ); //
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = "vendorImg-" + uniqueSuffix + ".jpeg";

      const filePath = `public/vendorImg/${fileName}`;
      fs.writeFileSync(filePath, base64Data, "base64");

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.confirmPassword, salt);
      const operatingDetailsString = req.body.operatingDetails;

      const today = dayjs(Date.now()).format("YYYY/MM/DD HH:mm:ss");
      const operatingDetails = await JSON.parse(operatingDetailsString);

      console.log(operatingDetails);
      const vendorCount = await getVendorCount(db);
      const vendorId = PadZeroes(vendorCount + 1, 3);
      const registrationStore = await RegisterStore(
        db,
        userid,
        req.body,
        hash,
        today
      );
      const registerVendor = await RegisterVendor(
        db,
        userid,
        req.body,
        vendorId,
        fileName
      );
      const insertStore = await InsertStoreInfo(
        db,
        vendorId,
        req.body,
        imageFile,
        pdfDti,
        pdfClearance,
        pdfPermit,
        validId
      );
      const storeOperation = await InsertStoreOperation(
        db,
        vendorId,
        req.body,
        operatingDetails
      );

      return res.json({ status: "success" });
    } catch (error) {
      console.error(error.message);
      res.json({ status: "error", message: error.message });
    }
    // Check if files were uploaded
  }
);

app.get("/Admin/:uid", authenticateToken, async (req, res) => {
  const storeInfo = await GetStoreInfo(db);
  const users = await GetUser(db);
  const products = await getAvailableProducts(db);
  res.json({
    stores: storeInfo,
    userInfo: users,
    availableProducts: products,
  });
});

app.get("/updateUsers", async (req, res) => {
  try {
    const users = await GetUser(db);
    res.json({
      userInfo: users,
    });
  } catch (error) {
    console.error("updateUsers error: " + error.message);
  }
});

app.get("/Vendor/:uid", authenticateToken, async (req, res) => {
  try {
    const { uid } = req.params;

    const vendorResult = await getVendor(db, uid);

    const vendorInfo = vendorResult.rows[0];
    const storeOpe = await GetStoreOperation(db, vendorInfo.store_id);
    const products = await getStoreProducts(db, vendorInfo.store_id);
    const orders = await fetchOrders(db, vendorInfo.store_id);
    if (vendorResult.rowCount > 0) {
      return res.json({
        vendor: vendorInfo,
        storeOpe: storeOpe,
        storeProducts: products,
        orders: orders,
      });
    }
  } catch (error) {
    return res.sendStatus(503);
  }
});

app.get("/renewProduct/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    console.log(storeId);
    const products = await getStoreProducts(db, storeId);
    return res.json({ status: "success", storeProducts: products });
  } catch (error) {
    console.error("Product renew error: " + error.message);
  }
});
app.get("/Admin/Store-Application/:store", async (req, res) => {
  const storeId = req.params.store;
  console.log(storeId);
  const storeOpe = await GetStoreOperation(db, storeId);
  res.json({
    storeOperation: storeOpe,
  });
});

app.get("/renewStores", async (req, res) => {
  try {
    const storeInfo = await GetStoreInfo(db);

    res.json({ stores: storeInfo });
  } catch (error) {
    console.error("Renew store error: " + error.message);
  }
});
app.post("/Admin/Application-Decision", async (req, res) => {
  try {
    const { decision, storeId } = req.body;

    if (decision === "Approved") {
      const approvedResult = await ApproveApplication(db, storeId);

      if (approvedResult) {
        res.json({ status: "success" });
      }
    }
  } catch (error) {
    console.error("Admin Application error: " + error.message);
  }
});

app.post("/Admin/Application-Reject/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    const { comment } = req.body;
    const rejected = await RejectApplication(db, storeId, comment);

    if (rejected) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("Admin Application error: " + error.message);
  }
});

app.post("/registercustomer", async (req, res) => {
  try {
    const { email, confirmpassword } = req.body;
    const checkEmail = await GetUserEmail(db, email);

    if (checkEmail.rowCount === 0) {
      const userid = uid(16);

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.confirmpassword, salt);

      const insertCustomer = await inserCustomer(db, userid, req.body, hash);
      if (insertCustomer.rowCount > 0) {
        return res.json({ status: "success" });
      }
    }

    return res.json({ status: "invalid", message: "Email already exist!" });
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
});

app.get("/Admin/Accounts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userRoleResult = await getUserRole(db, userId);
    const { role } = userRoleResult.rows[0];

    if (role === "Vendor") {
      const vendorInfo = await AdminViewUserInfo(db, userId);
      return res.json({ userinfo: vendorInfo });
    } else {
      const userInfo = await AdminViewCustomerInfo(db, userId);
      return res.json({ userinfo: userInfo });
    }
  } catch (error) {
    console.error(error);
  }
});

app.post(
  "/insert-addons",
  addOnsImage.single("productImg"),
  async (req, res) => {
    try {
      const { storeId, name, price, size } = req.body;

      const productCount = await countAddOns(db, storeId, size);
      const productCode = `ADDONS-${storeId}-${PadZeroes(
        parseInt(productCount) + 1,
        3
      )}`;

      const insertAddons = addStoreAddOns(
        db,
        req.body,
        productCode,
        req.file.filename
      );

      if (insertAddons) {
        return res.json({ status: "success" });
      }

      return res.json({
        status: "invalid",
        errmessage: "Product failed to save!",
      });
    } catch (error) {
      console.error("insert add on error: " + error.message);
    }
  }
);
app.post("/validate-addons", async (req, res) => {
  try {
    const { storeId, name, size } = req.body;
    const trimmedName = _.join(_.split(name, " "), "").toLowerCase();

    const productExist = await checkExistingAddOns(
      db,
      trimmedName,
      storeId,
      size
    );

    if (!productExist) {
      return res.json({ status: "success" });
    }
    return res.json({
      status: "invalid",
      errmessage: "Product already exist!",
    });
  } catch (error) {
    console.error("add addons error: " + error.message);
  }
});

app.post("/validateProduct", async (req, res) => {
  try {
    const { storeId, name, size } = req.body;
    const trimmedName = _.join(_.split(name, " "), "").toLowerCase();

    const productExist = await checkExistingProduct(
      db,
      storeId,
      trimmedName,
      size
    );

    if (!productExist) {
      return res.json({ status: "success" });
    }
    return res.json({ status: "invalid", errmessage: "Existing Product!" });
  } catch (error) {
    console.error("validate product error: " + error.message);
  }
});

app.post("/validateProductUpdate", async (req, res) => {
  try {
    const { storeId, name, size, availability, prod_id } = req.body;
    const trimmedName = _.join(_.split(name, " "), "").toLowerCase();
    const productExist = await checkExistingProductUpdate(
      db,
      storeId,
      trimmedName,
      size,
      prod_id
    );

    if (!productExist) {
      return res.json({ status: "success" });
    }
    return res.json({ status: "invalid", errmessage: "Existing Product!" });
  } catch (error) {
    console.error("validate update product error: " + error.message);
  }
});
app.post(
  "/uploadUpdateProductImg",
  productImage.single("productImg"),
  async (req, res) => {
    try {
      const { storeId, category } = req.body;

      const updateProduct = await updateProdWImg(
        db,
        req.body,
        req.file.filename
      );
      if (updateProduct) {
        return res.json({ status: "success" });
      }
    } catch (error) {
      console.error("uploadProduct error: " + error.message);
    }
  }
);

app.post("/uploadUpdateProduct", async (req, res) => {
  try {
    const { category, storeId } = req.body;

    const updateResult = await updateProdNoImg(db, req.body);

    if (updateResult) {
      return res.json({ status: "success" });
    }

    console.log("not success");
  } catch (error) {
    console.error("uploadProduct error: " + error.message);
  }
});
app.post(
  "/uploadProduct",
  productImage.single("productImg"),
  async (req, res) => {
    try {
      const { storeId, category } = req.body;

      const productCount = await countCategoryProduct(db, storeId, category);
      const categAcronym = generateAcronym(category);
      const productCode = `${categAcronym}-${storeId}-${PadZeroes(
        parseInt(productCount.count) + 1,
        3
      )}`;

      console.log(productCode);
      const insertProduct = await addStoreProduct(
        db,
        req.body,
        req.file.filename,
        productCode
      );

      if (insertProduct.rowCount > 0) {
        return res.json({ status: "success" });
      }
    } catch (error) {
      console.error("uploadProduct error: " + error.message);
    }
  }
);

app.post("/POSPayment", async (req, res) => {
  try {
    console.log(req.body);

    const { items, amountToPay, change, enteredAmount, service_type } =
      req.body;
    const orderNumber = await orderCount(db);
    const order_number = PadZeroes(parseInt(orderNumber) + 1, 8);

    let completed = true;
    for (let i = 0; i < items.length; i++) {
      const inserted = await insertOrder(
        db,
        items[i].storeid,
        items[i].id,
        order_number,
        items[i].quantity,
        items[i].totalPrice,
        enteredAmount,
        change,
        service_type
      );
      if (!inserted) {
        completed = false;
      }
    }

    if (completed) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("/POSTPayment error: " + error.message);
  }
});

app.post("/Online-order/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const { items, service_type } = req.body;
    const orderNumber = await orderCount(db);
    const order_number = PadZeroes(parseInt(orderNumber) + 1, 8);

    let completed = true;
    for (let i = 0; i < items.length; i++) {
      const insertResult = await InsertOnlineOrder(
        db,
        items[i].storeId,
        items[i].productId,
        uid,
        order_number,
        items[i].quantity,
        items[i].computedPrice,
        service_type
      );

      if (!insertResult) {
        completed = false;
      }
    }

    if (completed) {
      return res.json({ status: "success" });
    }
  } catch (error) {
    console.error("/Online-order/ error: " + error.message);
  }
});
app.post("/update-user-info/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const { email } = req.body;

    const emailVerified = await verifyEmailUpdate(db, email, uid);

    if (emailVerified > 0) {
      return res.json({ status: "invalid", message: "Email already exist!" });
    }

    const updateEmail = await updateUserEmail(db, uid, email);

    if (updateEmail) {
      const userExist = await verifyUserProfileExist(db, uid);

      if (userExist) {
        const updateUser = await updateUserProfile(db, req.body, uid);

        if (updateUser) {
          return res.json({ status: "success" });
        }
      }

      const userInsert = await insertUserProfile(db, req.body, uid);

      if (userInsert) {
        return res.json({ status: "success" });
      }
    }
  } catch (error) {
    console.error("update user error: " + error.message);
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error(err); // Log the error for debugging
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
app.use("/", (req,res)=>{
  res.send("Server is up")
})
server.listen(port, () => {
  console.log("Server running on port " + port);
});
