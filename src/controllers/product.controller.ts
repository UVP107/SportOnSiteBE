import { Request, Response } from "express";
import Product from "../models/product.model";

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "error creating product", error });
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "error fetching products", error });
  }
};

export const getProductByID = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      res.status(404).json({ message: "product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "error fetching product", error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true },
    );
    if (!product) {
      res.status(404).json({ message: "product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "error updating product", error });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "product not found" });
      return;
    }
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error deleting product", error });
  }
};
