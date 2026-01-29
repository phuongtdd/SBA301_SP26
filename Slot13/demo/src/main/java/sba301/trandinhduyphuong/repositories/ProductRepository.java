package sba301.trandinhduyphuong.repositories;


import org.springframework.stereotype.Repository;
import sba301.trandinhduyphuong.pojos.Product;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepository implements IProductRepository {

    private List<Product> products = new ArrayList<Product>();

    @Override
    public List<Product> getProducts() {
        return products;
    }

    @Override
    public Product getProduct(int id) {
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId() == id) {
                return products.get(i);
            }
        }
        return null;
    }

    @Override
    public List<Product> search(String name) {
        return List.of();
    }

    @Override
    public Product saveProduct(Product product) {
        Product product1 = new Product();
        product1.setName(product.getName());
        product1.setPrice(product.getPrice());
        product1.setQuantity(product.getQuantity());
        product1.setId(product.getId());
        products.add(product1);
        return product1;
    }

    @Override
    public String delete(Integer id) {
        products.removeIf( x -> x.getId() == id );
        return null;
    }

    @Override
    public Product updateProduct(Product product) {
        int idx = 0;
        int id =0;
        for (int i = 0; i < products.size(); i++) {
            if(products.get(i).getId() == product.getId()) {
                id = product.getId();
                idx = i;
                break;
            }
        }
        Product product1 = new Product();
        product1.setId(id);
        product1.setName(product.getName());
        product1.setPrice(product.getPrice());
        product1.setQuantity(product.getQuantity());
        products.set(idx, product1);
        return product1;
    }

    @Override
    public void createProducts() {
        products = List.of(
                new Product(1, "Apple", 50, 1000),
                new Product(2, "Banana", 30, 2000),
                new Product(3, "Orange", 20, 3000)
        );
    }
}
