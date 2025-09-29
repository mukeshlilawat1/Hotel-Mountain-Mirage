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
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        if (authHeader == null || authHeader.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        // Flexible JWT parsing: Bearer prefix optional
        jwtToken = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
        userEmail = jwtUtils.extractUserName(jwtToken);

        // Debug prints
        System.out.println("Authorization header: " + authHeader);
        System.out.println("JWT Token: " + jwtToken);
        System.out.println("Extracted Email: " + userEmail);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customerUserDetailsService.loadUserByUsername(userEmail);

            if (jwtUtils.isValidtoken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token);

                // Debug authorities
                System.out.println("Token valid? true");
                System.out.println("Authorities set in SecurityContext: " + userDetails.getAuthorities());
            } else {
                System.out.println("Token valid? false");
            }
        }

        filterChain.doFilter(request, response);
    }
}
