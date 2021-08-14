import Service from '../Service';
import { Payment } from '../@types';
import generateQueryString from '../utils/generateQueryString';


class PaymentService extends Service {
  static getAllPayments(query: Payment.Query) {
    const queryString = generateQueryString(query);
    return this.Http
      .get<Payment.Paginated>(`/payments${queryString}`)
      .then(this.getData);
  }

  static insertNewPayment(payment: Payment.Input) {
    return this.Http
      .post<Payment.Detailed>('/payments', payment)
      .then(this.getData);
  }

  static approvePaymentsBatch(paymentIds: number[]) {
    return this.Http
      .put<{}>('/payments/bulk-approvals', paymentIds)
      .then(this.getData);
  }

  static getPaymentPreview(paymentInfo: Payment.PreviewInput) {
    return this.Http
      .post<Payment.Preview>('/payments/previews', paymentInfo)
      .then(this.getData);
  }

  static approvePayment(paymentId: number) {
    return this.Http
      .put<{}>(`/payments/${paymentId}/approval`)
      .then(this.getData);
  }

  static getExistingPayments(paymentId: number) {
    return this.Http
      .get<Payment.Detailed>(`/payments/${paymentId}`)
      .then(this.getData);
  }

  static removeExistingPayment(paymentId: number) {
    return this.Http
      .delete<{}>(`/payments/${paymentId}`)
      .then(this.getData);
  }

  static getExistingPaymentPosts(paymentId: number) {
    return this.Http
      .get<Payment.PostWithEarnings[]>(`/payments/${paymentId}/posts`)
      .then(this.getData);
  }
}

export default PaymentService;
