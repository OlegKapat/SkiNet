using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;



namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;
        public readonly IBasketRepository _basketRepo;

        public OrderService(
           
            IBasketRepository basketRepo,
            IUnitOfWork unitOfWork,
            IPaymentService paymentService
        )
        {
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
            _paymentService = paymentService;
        }

        public OrderService()
        {
        }

        public async Task<Order>
        CreateOrderAsync(
            string buyerEmail,
            int deliveryMethodId,
            string basketId,
            Address shippingAddress
        )
        {
            var basket = await _basketRepo.GetBasketAsync(basketId);
        
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered =
                    new ProductItemOrdered(productItem.Id,
                        productItem.Name,
                        productItem.PictureUrl);
                var orderItem =
                    new OrderItem(itemOrdered,
                        productItem.Price,
                        item.Quantity);
                items.Add (orderItem);
            }
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
              // check to see if order exists
            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            var subtotal = items.Sum(item => item.Price * item.Quantity);
             // create order
            var order =
                new Order(items,
                    buyerEmail,
                    shippingAddress,
                    deliveryMethod,
                    subtotal,
                    basket.PaymentIntentId
                    );
            _unitOfWork.Repository<Order>().Add(order);
                if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
           return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>>
        GetOrdersForUserAsync(string buyerEmail)
        {
            var spec=new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);

        }
    }
}
