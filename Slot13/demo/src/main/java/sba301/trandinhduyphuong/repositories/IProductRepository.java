package sba301.trandinhduyphuong.repositories;


import sba301.trandinhduyphuong.pojos.Product;

import java.util.List;

public interface IProductRepository {
    public List<Product> getProducts();
    public Product getProduct(int id);
    public List<Product> search(String name);
    public Product saveProduct(Product product);
    public String delete(Integer id);
    public Product updateProduct(Product product);
    public void createProducts();
}
