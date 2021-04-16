const { salesService } = require('../services');
const {
  createSale,
  readSales,
  readSalesById,
  updateSaleById,
  deleteSaleById } = salesService;

const SUCESS = 200;
const UNPROCESSABLE = 422;
const CODE_INVALID = 'invalid_data';
const NOT_FOUND = 404;
const CODE_NOT_FOUND = 'not_found';

const saleCreate = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await createSale(body);
    res.status(SUCESS).json(result);
  } catch (error) {
    const err = JSON.parse(error.message);
    console.log(err);
    if (err.ok) {
      next({
        status: err.status,
        message: err.message,
        code: err.code,
      });
    } else {
      next({
        status: UNPROCESSABLE,
        message: error.message,
        code: CODE_INVALID,
      });
    }
  }
};

const saleRead = async (_req, res, next) => {
  try {
    const result = await readSales();
    res.status(SUCESS).json({
      sales: result,
    });
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const saleReadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await readSalesById(id);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: NOT_FOUND,
      message: error.message,
      code: CODE_NOT_FOUND,
    });
  }
};

const saleUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await updateSaleById(id, body);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

const saleDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSaleById(id);
    res.status(SUCESS).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: UNPROCESSABLE,
      message: error.message,
      code: CODE_INVALID,
    });
  }
};

module.exports = {
  saleCreate,
  saleRead,
  saleReadById,
  saleUpdate,
  saleDelete,
};
