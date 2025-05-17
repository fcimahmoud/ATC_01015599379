﻿
global using Services.Abstractions;
global using Shared.AuthModels;
global using Microsoft.AspNetCore.Authorization;
global using System.Security.Claims;

namespace Presentation
{
    public class AuthenticationController (IServiceManager serviceManager)
        : ApiController
    {
        [HttpPost("Login")]
        public async Task<ActionResult<UserResultDTO>> Login(LoginDTO login)
            => Ok(await serviceManager.AuthenticationService.LoginAsync(login));

        [HttpPost("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid user token");

            var result = await serviceManager.AuthenticationService.LogoutAsync(userId);

            if (!result)
                return BadRequest("Logout failed");

            return Ok(new { message = "Logout successful" });
        }


        [HttpPost("Register")]
        public async Task<ActionResult<UserResultDTO>> Register(RegisterDTO register)
        {
            await serviceManager.AuthenticationService.RegisterAsync(register);
            return Ok("User Registered Successfully. Please check your email for confirmation OTP.");
        }

        [HttpPost("Confirm-Email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string email, [FromQuery] string otp)
        {
            var result = await serviceManager.AuthenticationService.ConfirmEmailAsync(email, otp);
            if (!result) return BadRequest("Email confirmation failed. Invalid or expired OTP.");

            return Ok("Email confirmed successfully. You can now log in.");
        }

        [HttpGet("Refresh-Token")]
        public async Task<ActionResult<UserResultDTO>> RefreshToken([FromBody] RefreshTokenRequestDTO request)
            => Ok(await serviceManager.AuthenticationService.RefreshTokenAsync(request.RefreshToken));

        [HttpPost("Forgot-Password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestDto dto)
        {
            var result = await serviceManager.AuthenticationService.ForgotPasswordAsync(dto);
            if (!result) return BadRequest("Email not found or failed to send email.");

            return Ok("Password reset OTP sent successfully.");
        }

        [HttpPut("Reset-Password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto dto)
        {
            var result = await serviceManager.AuthenticationService.ResetPasswordAsync(dto);
            if (!result) return BadRequest("Invalid OTP or password reset failed.");

            return Ok("Password reset successfully.");
        }

        [HttpPost("Resend-EmailConfirmation-Otp")]
        public async Task<IActionResult> ResendEmailConfirmationOTP([FromBody] ResendOTPRequestDto request)
        {
            var success = await serviceManager.AuthenticationService.ResendEmailConfirmationOTPAsync(request.Email);
            if (!success) return BadRequest("Failed to resend OTP.");

            return Ok(new { Message = "OTP resent successfully. Please check your email." });
        }
        [HttpPost("Resend-PasswordReset-Otp")]
        public async Task<IActionResult> ResendPasswordResetOTP([FromBody] ResendOTPRequestDto request)
        {
            var success = await serviceManager.AuthenticationService.ResendPasswordResetOTPAsync(request.Email);
            if (!success) return BadRequest("Failed to resend OTP.");

            return Ok(new { Message = "OTP resent successfully. Please check your email." });
        }
    }
}
