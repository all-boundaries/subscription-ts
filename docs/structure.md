# Structure

## User interacting with the application

> **Boundary**: Browser -> HTTP

```mermaid
flowchart LR
    user("User") -->|accesses| web
    user -->|views| subscription_plans
    user -->|clicks| subscribe_button

    subgraph browser
        subgraph web [Subscription Website]
            subscription_plans("Subscription Plans<br/><em>(html page)</em>")
            subscribe_button("Subscribe<br/><em>(button)</em>")
        end
    end

    subgraph app [Subscription app]
        subgraph http ["server-definition.ts"]
            web --> index["handler for<br/>GET /"]
            subscribe_button --> subscribe["handler for<br/>POST /subscriptions"]
        end
    end

style http fill:#53AFDC,stroke:#FFFFFF,stroke-width:1px
```

## Communication with external services

> **Boundary**: Domain -> External Service

```mermaid
flowchart LR
    subgraph app [Subscription app]
        subgraph gateway [product-catalog-gateway.ts]
            allProducts("allProducts()<br/><em>(function)</em><br/><strong>(A)</strong>") -->|uses| productCatalogClient("productCatalogClient()<br/><em>(function)</em><br/><strong>(B)</strong>")
        end
    end
    productCatalogClient -->|calls| server("Product Catalog<br/><em>(External Service)</em><br/><strong>(C)")

style app fill:#333333,stroke:#FFFFFF,stroke-width:2px
style gateway fill:#53AFDC,stroke:#FFFFFF,stroke-width:1px
```

## Communication with storage systems

> **Boundary**: Domain -> Storage

```mermaid
flowchart LR
    subgraph app [Subscription app]
        subgraph gateway [subscription-db.ts]
            findActiveByUserId("findActiveByUserId(userId)<br/><em>(function)</em><br/><strong>(A)</strong>") -->|uses| db("db()<br/><em>(function)</em><br/><strong>(B)</strong>")
        end
    end
    db -->|calls| server("SQLite<br/><em>(Storage)</em><br/><strong>(C)")

style app fill:#333333,stroke:#FFFFFF,stroke-width:2px
style gateway fill:#53AFDC,stroke:#FFFFFF,stroke-width:1px
```
