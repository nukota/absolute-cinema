export type Language = "en" | "vn";

export const translations: Record<string, [string, string]> = {
  // Home page - [English, Vietnamese]
  "home.nowShowing": ["Now Showing", "Đang Chiếu"],
  "home.comingSoon": ["Coming Soon", "Sắp Chiếu"],
  "home.whyChooseUs": ["WHY CHOOSE US", "TẠI SAO CHỌN CHÚNG TÔI"],
  "home.latestMovies": ["Latest Movies", "Phim Mới Nhất"],
  "home.latestMoviesDesc": [
    "Watch the newest releases and blockbusters",
    "Xem những bộ phim mới nhất và bom tấn",
  ],
  "home.comfortableSeats": ["Comfortable Seats", "Ghế Thoải Mái"],
  "home.comfortableSeatsDesc": [
    "Premium seating with maximum comfort",
    "Ghế ngồi cao cấp với sự thoải mái tối đa",
  ],
  "home.easyBooking": ["Easy Booking", "Đặt Vé Dễ Dàng"],
  "home.easyBookingDesc": [
    "Book tickets online in just a few clicks",
    "Đặt vé trực tuyến chỉ với vài cú nhấp chuột",
  ],
  "home.movieSaved": ["Movie saved successfully!", "Đã lưu phim thành công!"],

  // Footer - [English, Vietnamese]
  "footer.description": [
    "Your premier destination for the latest movies and unforgettable cinema experiences.",
    "Điểm đến hàng đầu của bạn cho những bộ phim mới nhất và trải nghiệm rạp chiếu phim khó quên.",
  ],
  "footer.quickLinks": ["Quick Links", "Liên Kết Nhanh"],
  "footer.nowShowing": ["Now Showing", "Đang Chiếu"],
  "footer.comingSoon": ["Coming Soon", "Sắp Chiếu"],
  "footer.myBookings": ["My Bookings", "Đặt Chỗ Của Tôi"],
  "footer.customerService": ["Customer Service", "Dịch Vụ Khách Hàng"],
  "footer.helpCenter": ["Help Center", "Trung Tâm Trợ Giúp"],
  "footer.termsConditions": ["Terms & Conditions", "Điều Khoản & Điều Kiện"],
  "footer.privacyPolicy": ["Privacy Policy", "Chính Sách Bảo Mật"],
  "footer.contactUs": ["Contact Us", "Liên Hệ Chúng Tôi"],
  "footer.email": [
    "Email: info@absolutecinema.com",
    "Email: info@absolutecinema.com",
  ],
  "footer.phone": ["Phone: 1900-1234", "Điện thoại: 1900-1234"],
  "footer.hotline": ["Hotline: 0123-456-789", "Hotline: 0123-456-789"],
  "footer.copyright": [
    "© 2025 Absolute Cinema. All rights reserved.",
    "© 2025 Absolute Cinema. Tất cả quyền được bảo lưu.",
  ],

  // SlideItem - [English, Vietnamese]
  "slide.save": ["Save", "Lưu"],
  "slide.unsave": ["Unsave", "Bỏ Lưu"],
  "slide.book": ["Book", "Đặt"],
  "slide.trailer": ["Trailer", "Trailer"],
  "slide.genre": ["Genre:", "Thể loại:"],
  "slide.duration": ["Duration:", "Thời lượng:"],
  "slide.rating": ["Rating:", "Đánh giá:"],
  "slide.year": ["Year:", "Năm:"],
  "slide.director": ["Director:", "Đạo diễn:"],

  // HeroSection - [English, Vietnamese]
  "hero.welcome": [
    "Showing movies on Absolute Cinema!",
    "Phim đang chiếu tại Absolute Cinema!",
  ],
  "hero.genre": ["Genre:", "Thể loại:"],
  "hero.duration": ["Duration:", "Thời lượng:"],
  "hero.year": ["Year:", "Năm:"],
  "hero.director": ["Director:", "Đạo diễn:"],
  "hero.cast": ["Cast:", "Diễn viên:"],
  "hero.bookTicket": ["Book Ticket", "Đặt Vé"],
  "hero.watchTrailer": ["Watch Trailer", "Xem Trailer"],

  // MovieInfo - [English, Vietnamese]
  "movie.nowShowing": ["Now Showing", "Đang Chiếu"],
  "movie.comingSoon": ["Coming Soon", "Sắp Chiếu"],
  "movie.stopped": ["Stopped", "Đã Dừng"],
  "movie.unknown": ["Unknown", "Không Xác Định"],
  "movie.duration": ["Duration:", "Thời lượng:"],
  "movie.quality": ["Quality:", "Chất lượng:"],
  "movie.rating": ["(4.5/5)", "(4.5/5)"],
  "movie.advisory": ["Advisory:", "Cảnh báo:"],
  "movie.year": ["Year:", "Năm:"],
  "movie.genre": ["Genre:", "Thể loại:"],
  "movie.director": ["Director:", "Đạo diễn:"],
  "movie.cast": ["Cast:", "Diễn viên:"],
  "movie.playTrailer": ["Play Trailer", "Phát Trailer"],

  // Booking - [English, Vietnamese]
  "booking.selectSeats": ["Select Seats", "Chọn Ghế"],
  "booking.showtimeNotFound": [
    "Showtime not found",
    "Không tìm thấy suất chiếu",
  ],
  "booking.backToMovies": ["Back to Movies", "Quay lại Phim"],
  "booking.movie": ["Movie", "Phim"],
  "booking.cinema": ["Cinema", "Rạp"],
  "booking.dateTime": ["Date & Time", "Ngày & Giờ"],
  "booking.room": ["Room", "Phòng"],
  "booking.screen": ["SCREEN", "MÀN HÌNH"],
  "booking.available": ["Available", "Có Sẵn"],
  "booking.selected": ["Selected", "Đã Chọn"],
  "booking.occupied": ["Occupied", "Đã Đặt"],
  "booking.addSnacks": ["Add Snacks & Drinks", "Thêm Đồ Ăn & Nước Uống"],
  "booking.summary": ["Booking Summary", "Tóm Tắt Đặt Vé"],
  "booking.selectedSeats": ["Selected Seats", "Ghế Đã Chọn"],
  "booking.noSeats": ["No seats selected", "Chưa chọn ghế nào"],
  "booking.products": ["Products", "Sản Phẩm"],
  "booking.total": ["Total", "Tổng Cộng"],
  "booking.proceedToPayment": ["Proceed to Payment", "Tiến Hành Thanh Toán"],

  // MovieDetail - [English, Vietnamese]
  "movieDetail.selectShowtime": ["Select Showtime", "Chọn Suất Chiếu"],
  "movieDetail.chooseDateTime": [
    "Choose your preferred date and time",
    "Chọn ngày và giờ bạn muốn",
  ],
  "movieDetail.selectDate": ["Select Date", "Chọn Ngày"],
  "movieDetail.allDates": ["All Dates", "Tất Cả Ngày"],
  "movieDetail.selectCinema": ["Select Cinema", "Chọn Rạp"],
  "movieDetail.allCinemas": ["All Cinemas", "Tất Cả Rạp"],
  "movieDetail.noShowtimes": [
    "Currently there're no showtimes",
    "Hiện tại không có suất chiếu",
  ],
  "movieDetail.tryDifferent": [
    "Try selecting different date or cinema options",
    "Thử chọn ngày hoặc rạp khác",
  ],
  "movieDetail.checkBack": [
    "Check back later for showtime updates",
    "Kiểm tra lại sau để biết suất chiếu mới",
  ],
  "movieDetail.noLongerShowing": [
    "This movie is no longer showing",
    "Phim này không còn chiếu nữa",
  ],
  "movieDetail.browseOther": ["Browse Other Movies", "Xem Phim Khác"],
  "movieDetail.continueToSeats": [
    "Continue to Seat Selection",
    "Tiếp Tục Chọn Ghế",
  ],
  "movieDetail.movieNotFound": ["Movie not found", "Không tìm thấy phim"],
  "movieDetail.backToMovies": ["Back to Movies", "Quay lại Phim"],

  // Payment - [English, Vietnamese]
  "payment.title": ["Payment", "Thanh Toán"],
  "payment.subtitle": [
    "Complete your booking by providing payment details",
    "Hoàn tất đặt vé bằng cách cung cấp thông tin thanh toán",
  ],
  "payment.customerInfo": ["Customer Information", "Thông Tin Khách Hàng"],
  "payment.name": ["Name", "Tên"],
  "payment.email": ["Email", "Email"],
  "payment.paymentMethod": ["Payment Method", "Phương Thức Thanh Toán"],
  "payment.creditCard": ["Credit/Debit Card", "Thẻ Tín Dụng/Ghi Nợ"],
  "payment.creditCardDesc": [
    "Pay securely with your card",
    "Thanh toán an toàn với thẻ của bạn",
  ],
  "payment.vnpay": ["VNPay", "VNPay"],
  "payment.vnpayDesc": [
    "Pay with VNPay e-wallet",
    "Thanh toán với ví điện tử VNPay",
  ],
  "payment.cash": ["Cash at Counter", "Tiền Mặt Tại Quầy"],
  "payment.cashDesc": ["Pay at the cinema counter", "Thanh toán tại quầy rạp"],
  "payment.banking": ["Bank Transfer", "Chuyển Khoản Ngân Hàng"],
  "payment.bankingDesc": [
    "Transfer to our bank account",
    "Chuyển khoản vào tài khoản ngân hàng",
  ],
  "payment.cardNumber": ["Card Number", "Số Thẻ"],
  "payment.expiryDate": ["Expiry Date", "Ngày Hết Hạn"],
  "payment.cvv": ["CVV", "CVV"],
  "payment.cardholderName": ["Cardholder Name", "Tên Chủ Thẻ"],
  "payment.orderSummary": ["Order Summary", "Tóm Tắt Đơn Hàng"],
  "payment.movie": ["Movie", "Phim"],
  "payment.cinema": ["Cinema", "Rạp"],
  "payment.dateTime": ["Date & Time", "Ngày & Giờ"],
  "payment.seats": ["Seats", "Ghế"],
  "payment.products": ["Products", "Sản Phẩm"],
  "payment.tickets": ["Tickets", "Vé"],
  "payment.total": ["Total", "Tổng Cộng"],
  "payment.completePayment": ["Complete Payment", "Hoàn Tất Thanh Toán"],
  "payment.processing": ["Processing...", "Đang xử lý..."],
  "payment.back": ["Back", "Quay lại"],
  "payment.noBookingData": [
    "No booking data found or user not authenticated",
    "Không tìm thấy dữ liệu đặt vé hoặc người dùng chưa đăng nhập",
  ],

  // Confirmation - [English, Vietnamese]
  "confirmation.confirmed": ["Booking Confirmed!", "Đã Xác Nhận Đặt Vé!"],
  "confirmation.customerDetails": ["Customer Details", "Thông Tin Khách Hàng"],
  "confirmation.name": ["Name", "Tên"],
  "confirmation.email": ["Email", "Email"],
  "confirmation.movieDetails": ["Movie Details", "Chi Tiết Phim"],
  "confirmation.movie": ["Movie", "Phim"],
  "confirmation.cinema": ["Cinema", "Rạp"],
  "confirmation.room": ["Room", "Phòng"],
  "confirmation.dateTime": ["Date & Time", "Ngày & Giờ"],
  "confirmation.at": ["at", "lúc"],
  "confirmation.seats": ["Seats", "Ghế"],
  "confirmation.paymentSummary": ["Payment Summary", "Tóm Tắt Thanh Toán"],
  "confirmation.tickets": ["Tickets", "Vé"],
  "confirmation.products": ["Products", "Sản Phẩm"],
  "confirmation.totalPaid": ["Total Paid", "Tổng Đã Thanh Toán"],
  "confirmation.paidBy": ["Paid by", "Thanh toán bằng"],
  "confirmation.getTicket": ["Get Ticket", "Lấy Vé"],
  "confirmation.bookMore": ["Book More", "Đặt Thêm"],

  // MoviesPage - [English, Vietnamese]
  "moviesPage.title": ["All Movies", "Tất Cả Phim"],
  "moviesPage.subtitle": [
    "Browse our collection of movies and book your tickets today",
    "Duyệt bộ sưu tập phim và đặt vé ngay hôm nay",
  ],
  "moviesPage.searchPlaceholder": ["Search movies...", "Tìm kiếm phim..."],
  "moviesPage.nowShowing": ["Now Showing", "Đang Chiếu"],
  "moviesPage.comingSoon": ["Coming Soon", "Sắp Chiếu"],
  "moviesPage.noMovies": ["No movies found", "Không tìm thấy phim"],
  "moviesPage.movieSaved": [
    "Movie saved successfully!",
    "Đã lưu phim thành công!",
  ],

  // SavedMoviesPage - [English, Vietnamese]
  "savedMovies.title": ["Saved Movies", "Phim Đã Lưu"],
  "savedMovies.subtitle": [
    "We'll notify you when these movies are released or available for booking",
    "Chúng tôi sẽ thông báo khi những phim này được phát hành hoặc có thể đặt vé",
  ],
  "savedMovies.searchPlaceholder": [
    "Search saved movies...",
    "Tìm kiếm phim đã lưu...",
  ],
  "savedMovies.noMovies": [
    "No saved movies found",
    "Không tìm thấy phim đã lưu",
  ],
  "savedMovies.movieSaved": [
    "Movie saved successfully!",
    "Đã lưu phim thành công!",
  ],

  // Profile - [English, Vietnamese]
  "profile.title": ["My Profile", "Hồ Sơ Của Tôi"],
  "profile.subtitle": [
    "Manage your account and view booking history",
    "Quản lý tài khoản và xem lịch sử đặt vé",
  ],
  "profile.memberSince": ["Member Since", "Thành Viên Từ"],
  "profile.totalBookings": ["Total Bookings", "Tổng Đặt Vé"],
  "profile.account": ["Account", "Tài Khoản"],
  "profile.bookingHistory": ["Booking History", "Lịch Sử Đặt Vé"],
  "profile.accountInfo": ["Account Information", "Thông Tin Tài Khoản"],
  "profile.fullName": ["Full Name", "Họ Tên"],
  "profile.email": ["Email", "Email"],
  "profile.phoneNumber": ["Phone Number", "Số Điện Thoại"],
  "profile.dateOfBirth": ["Date of Birth", "Ngày Sinh"],
  "profile.cccd": ["CCCD (ID)", "CCCD"],
  "profile.noBookings": ["No bookings yet", "Chưa có đặt vé nào"],
  "profile.browseMovies": ["Browse Movies", "Xem Phim"],
  "profile.seats": ["Seats:", "Ghế:"],
  "profile.updateSuccess": [
    "Profile updated successfully!",
    "Cập nhật hồ sơ thành công!",
  ],
  "profile.updateError": [
    "Failed to update profile. Please try again.",
    "Cập nhật hồ sơ thất bại. Vui lòng thử lại.",
  ],

  // VNPayPayment - [English, Vietnamese]
  "vnpayPayment.title": ["Complete Your Payment", "Hoàn Tất Thanh Toán"],
  "vnpayPayment.message": [
    "A new tab has been opened for you to complete your payment with VNPay.",
    "Một tab mới đã được mở để bạn hoàn tất thanh toán với VNPay.",
  ],
  "vnpayPayment.goBack": ["Go Back to Home Page", "Quay Lại Trang Chủ"],

  // VNPayResult - [English, Vietnamese]
  "vnpayResult.success": ["Payment Successful!", "Thanh Toán Thành Công!"],
  "vnpayResult.failed": ["Payment Failed", "Thanh Toán Thất Bại"],
  "vnpayResult.orderDetails": ["Order Details", "Chi Tiết Đơn Hàng"],
  "vnpayResult.bank": ["Bank:", "Ngân hàng:"],
  "vnpayResult.transactionCode": ["Transaction Code:", "Mã giao dịch:"],
  "vnpayResult.amount": ["Amount:", "Số tiền:"],
  "vnpayResult.goBackAdmin": [
    "Go back to Admin Page",
    "Quay lại Trang Quản Trị",
  ],
  "vnpayResult.goBackHome": ["Go back to Home Page", "Quay lại Trang Chủ"],
};
