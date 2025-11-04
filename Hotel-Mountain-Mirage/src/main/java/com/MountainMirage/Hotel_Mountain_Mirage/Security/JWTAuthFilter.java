package com.MountainMirage.Hotel_Mountain_Mirage.Security;

import com.MountainMirage.Hotel_Mountain_Mirage.Service.CustomerUserDetailsService;
import com.MountainMirage.Hotel_Mountain_Mirage.Utils.JWTUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private CustomerUserDetailsService customerUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        // 🔍 Debug log to trace all incoming requests
        System.out.println("➡️ Request Path: " + request.getServletPath());

        // ✅ Skip filtering for public routes handled in shouldNotFilter()
        if (authHeader == null || authHeader.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🧩 Extract JWT token (Bearer prefix optional)
        jwtToken = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        userEmail = jwtUtils.extractUserName(jwtToken);

        // 🧠 Debugging info
        System.out.println("Auth Header: " + authHeader);
        System.out.println("JWT Token: " + jwtToken);
        System.out.println("Extracted Email: " + userEmail);

        // 🛡️ Token Validation + SecurityContext setup
        try {
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = customerUserDetailsService.loadUserByUsername(userEmail);

                if (jwtUtils.isValidtoken(jwtToken, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities());

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    System.out.println("✅ Token valid → Authenticated user: " + userEmail);
                } else {
                    System.out.println("❌ Invalid JWT token for user: " + userEmail);
                }
            }
        } catch (Exception ex) {
            System.err.println("⚠️ JWT Validation Exception: " + ex.getMessage());
        }

        // Continue request chain
        filterChain.doFilter(request, response);
    }

    /**
     * ✅ Skip JWT validation for public routes (important to avoid 403 on /auth endpoints)
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();

        // 🧭 Debug for route skipping
        if (path.startsWith("/auth") || path.startsWith("/rooms") ||
                path.startsWith("/bookings/get-by-confirmation-code")) {
            System.out.println("⏩ Skipping JWT filter for: " + path);
            return true;
        }

        return false;
    }
}
