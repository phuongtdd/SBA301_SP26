package sba301.trandinhduyphuong.services;

import sba301.trandinhduyphuong.pojos.Product;

import java.util.List;

public interface IProductService {
    public Product saveProduct(Product product);
    public List<Product> getAllProducts();
    public Product getProductById(int id);
    public String deleteProductById(int id);
    public Product updateProduct(Product product);
}
