<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 underline">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Log in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <form action="{{ route('post.form') }}" method="POST">
                    @csrf

                    <div class="form-group{{ $errors->has('account_type') ? ' has-error' : '' }}">
                        <div class="col-md-12 input-group">
                            <input type="radio" class="form-control" name="account_type" value="0"> <span>Cá nhân</span>

                            <input type="radio" class="form-control" name="account_type" value="1"> <span>Tổ chức</span>
                        </div>
                        <div class="col-md-12 error-block">
                            @if ($errors->has('account_type'))
                                <span class="help-block">
                                    <span>{{ $errors->first('account_type') }}</span>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                        <div class="col-md-12 input-group">
                            <input type="text" class="form-control" name="name" value="{{ old('name') }}" autofocus placeholder="Tên *">
                        </div>
                        <div class="col-md-12 error-block">
                            @if ($errors->has('name'))
                                <span class="help-block">
                                    <span>{{ $errors->first('name') }}</span>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                        <div class="col-md-12 input-group">
                            <input type="text" class="form-control" name="email" value="{{ old('email') }}" autofocus placeholder="Email *">
                        </div>
                        <div class="col-md-12 error-block">
                            @if ($errors->has('email'))
                                <span class="help-block">
                                    <span>{{ $errors->first('email') }}</span>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
                        <div class="col-md-12 input-group">
                            <input type="text" class="form-control" name="phone" value="{{ old('phone') }}" autofocus placeholder="SDT *">
                        </div>
                        <div class="col-md-12 error-block">
                            @if ($errors->has('phone'))
                                <span class="help-block">
                                    <span>{{ $errors->first('phone') }}</span>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                        <div class="col-md-12 input-group">
                            <input id="password" type="password" class="form-control" name="password" value="{{ old('password') }}" autofocus placeholder="Mật khẩu *">
                        </div>
                        <div class="col-md-12 error-block">
                            @if ($errors->has('password'))
                                <span class="help-block">
                                    <span>{{ $errors->first('password') }}</span>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('status') ? ' has-error' : '' }}">
                        <div class="col-md-12 input-group">
                            <label for="name">Trạng thái *: </label>
                            <input id="name" type="checkbox" name="status" value="1">
                        </div>
                        <div class="col-md-12 error-block">
                            @if ($errors->has('status'))
                                <span class="help-block">
                                    <span>{{ $errors->first('status') }}</span>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="form-group{{ $errors->has('code_perfix') ? ' has-error' : '' }}">
                        <div class="col-md-12 input-group">
                            <input id="code_perfix" type="text" class="form-control" name="code_perfix" value="{{ old('code_perfix') }}" autofocus placeholder="Mã Perfix">
                        </div>
                        <div class="col-md-12 error-block">
                            @if ($errors->has('code_perfix'))
                                <span class="help-block">
                                    <span>{{ $errors->first('code_perfix') }}</span>
                                </span>
                            @endif
                        </div>
                    </div>

                    <button type="submit">Lưu</button>
                </form>
            </div>
        </div>
    </body>
</html>
