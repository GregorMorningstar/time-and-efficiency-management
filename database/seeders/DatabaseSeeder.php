<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@o2.pl',
            'password' => bcrypt('qwer1234'),
            'role' => UserRole::ADMIN->value,
        ]);

        User::factory()->create([
            'name' => 'moderator',
            'email' => 'moderator@o2.pl',
            'password' => bcrypt('qwer1234'),
            'role' => UserRole::MODERATOR->value,
        ]);

        User::factory()->create([
            'name' => 'employee',
            'email' => 'employee@o2.pl',
            'password' => bcrypt('qwer1234'),
            'role' => UserRole::EMPLOYEE->value,
        ]);
    }
}
