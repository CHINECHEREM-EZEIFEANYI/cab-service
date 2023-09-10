
exports.DriverStatus = {
    APPROVED: "Approved",
    REJECTED: "Rejected",
    PENDING: "Pending"
}
 
exports.BookingStatus = {
    ACCEPTED: "Accepted",
   DECLINED: "Declined",
    PENDING: "Pending"
}
exports.JourneyStatus = {
   NOTSTARTED : "not started",
    STARTED: "started",
    ENDED: "ended"
 }
exports.isLicenseNumberValid = function (licenseNumber) {
    const licenseNumberPattern = /^[A-Z]{2,3}-\d{3,4}-\[A-Z]{2,3} $/

    if(licenseNumberPattern.test(licenseNumber)){
    return true
} else {
    return false
     }
    
 }