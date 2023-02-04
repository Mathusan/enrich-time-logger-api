
export const checkIsInRole = (...roles : any) => (req : any, res : any, next : any) => {
    if (!req.user) {
      return res.redirect('/login')
    }
  
    const hasRole = roles.find((role : any)  => req.user.role === role)
    if (!hasRole) {
      return res.redirect('/login')
    }
  
    return next()
  }