<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modell extends Model
{
    use HasFactory;
    protected  $primaryKey = 'mod_id';
    protected $fillable = [
        'mod_id',
        'nev',
        'leiras',
        'kategoria', 
        'gyarto',
        'kep'
    ];
}
