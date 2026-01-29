package sba301.trandinhduyphuong.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sba301.trandinhduyphuong.pojos.Product;
import sba301.trandinhduyphuong.repositories.ProductRepository;

import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        return productRepository.saveProduct(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.getProducts();
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.getProduct(id);
    }

    @Override
    public String deleteProductById(int id) {
        productRepository.delete(id);
        return "Deleted Successfully";
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.updateProduct(product);
    }
}
